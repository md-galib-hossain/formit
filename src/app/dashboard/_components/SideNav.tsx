import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { db } from "@/configs";
import { jsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import {
  FileLineChart,
  MessageSquareReply,
  ShieldEllipsis,
  SquareLibrary,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TFormItem } from "./FormList";
import { TJsonForm } from "@/app/edit-form/[formId]/page";

const SideNav = () => {
  const { user } = useUser();
  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: SquareLibrary,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Responses",
      icon: MessageSquareReply,
      path: "/dashboard/responses",
    },
    {
      id: 3,
      name: "Analytics",
      icon: FileLineChart,
      path: "/dashboard/analytics",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldEllipsis,
      path: "/dashboard/upgrade",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [percentageFileCreated, setPercentageFileCreated] = useState(0);
  const [formList, setFormList] = useState<TFormItem[]>([]);
  const path = usePathname();

  useEffect(() => {
    if (user) {
      getFormList();
    }
  }, [user]);

  const getFormList = async () => {
    if (user?.primaryEmailAddress?.emailAddress) {
      setLoading(true);
      try {
        const result = await db
          .select()
          .from(jsonForms)
          .where(eq(jsonForms.createdBy, user.primaryEmailAddress.emailAddress))
          .orderBy(desc(jsonForms.id));

        // Map the result to parse jsonform to TJsonForm
        const parsedResult: TFormItem[] = result.map((item: any) => ({
          ...item,
          jsonform: JSON.parse(item.jsonform) as TJsonForm,
        }));

        setFormList(parsedResult);
        const perc = (result.length / 3) * 100;
        setPercentageFileCreated(perc);
      } catch (error) {
        console.error("Error fetching form list:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="h-screen shadow-md border bg-white flex flex-col">
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
            <span className="">{menu.name}</span>
          </Link>
        ))}
      </div>

      <div className="p-6 w-full md:w-64">
        <Button className="w-full">+ Create Form</Button>
        <div className="my-7">
          {loading ? (
            <Progress hidden />
          ) : (
            <Progress value={percentageFileCreated} />
          )}
          <h2 className="text-sm mt-2 text-gray-600">
            <strong>{formList.length}</strong> Out of <strong>3</strong> Files Created
          </h2>
          <h2 className="text-sm mt-3 text-gray-600">
            Upgrade your plan for unlimited AI form build
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
