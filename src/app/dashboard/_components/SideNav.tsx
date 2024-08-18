"use client";
import { useEffect, useState } from "react";
import { FileLineChart, MessageSquareReply, ShieldEllipsis, SquareLibrary } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TFormItem } from "./FormList";
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";

const SideNav = ({ user }: any) => {
  const [loading, setLoading] = useState(false);
  const [percentageFileCreated, setPercentageFileCreated] = useState(0);
  const [formList, setFormList] = useState<TFormItem[]>([]);
  const [refetch, setRefetch] = useState(false);
  const path = usePathname();

  useEffect(() => {
    if (user?.email) {
      getFormList();
    }
  }, [user?.email, refetch]);

  const getFormList = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(jsonForms)
        .where(eq(jsonForms.createdBy, user.email))
        .orderBy(desc(jsonForms.id));

      const parsedResult: TFormItem[] = result.map((item: any) => ({
        ...item,
        jsonform: JSON.parse(item.jsonform),
      }));

      setFormList(parsedResult);
      const perc = (parsedResult.length / 3) * 100;
      setPercentageFileCreated(perc);
    } catch (error) {
      console.error("Error fetching form list:", error);
    } finally {
      setLoading(false);
    }
  };

  const menuList = [
    { id: 1, name: "My Forms", icon: SquareLibrary, path: "/dashboard" },
    { id: 2, name: "Responses", icon: MessageSquareReply, path: "/dashboard/responses" },
    { id: 3, name: "Analytics", icon: FileLineChart, path: "/dashboard/analytics" },
    { id: 4, name: "Upgrade", icon: ShieldEllipsis, path: "/dashboard/upgrade" },
  ];

  const isFormCreationDisabled = !user.isPremium && formList.length >= 3;
  const isPremiumValid = user.isPremium && new Date(user.expiryDate) > new Date();

  return (
   <div className="fixed top-0 left-0 h-screen shadow-md border bg-white flex flex-col w-full md:w-64">
  <div className="p-5 flex-grow overflow-y-auto">
    {menuList.map((menu) => (
      <Link
        href={menu.path}
        key={menu.id}
        className={`flex items-center gap-3 p-4 mb-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer text-gray-500 ${
          path === menu.path ? "bg-primary text-white" : ""
        }`}
      >
        <menu.icon className="w-5 h-5" />
        <span>{menu.name}</span>
      </Link>
    ))}
  </div>

  <div className="p-6">
    {user.isPremium ? (
      <>
        <h2 className="text-sm text-primary font-bold">You are a premium user</h2>
        <h3 className="text-sm text-gray-600">
          Expiry Date: {new Date(user.expiryDate).toLocaleDateString()}
        </h3>
      </>
    ) : (
      <h2 className="text-sm text-red-600 font-bold">Upgrade your plan for unlimited AI form build</h2>
    )}

    {!isPremiumValid && (
      <div className="my-7">
        {loading ? (
          <Progress hidden />
        ) : (
          <Progress value={percentageFileCreated} />
        )}
        <h2 className="text-sm mt-2 text-gray-600">
          <strong>{formList.length}</strong> Out of <strong>3</strong> Files Created
        </h2>
      </div>
    )}
  </div>
</div>

  );
};

export default SideNav;
