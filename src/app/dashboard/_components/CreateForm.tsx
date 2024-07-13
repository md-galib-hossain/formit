"use client";
import { Button } from "@/components/ui/button";
import moment from 'moment'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/configs";
import { AiChatSession } from "@/configs/AiModal";
import { jsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateForm = () => {
  const prompt =
    ", on the basis of description please give form in json format with form title , form subheading with having form field, form name, form placeholder name and form label, field type, field required in json format";
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const {user} = useUser()
  const router = useRouter()
  const onCreateForm = async () => {
    setLoading(true);
    const result = await AiChatSession.sendMessage(
      "Description:" + userInput + prompt
    );
    const response = result?.response?.text();
    if (response) {
        const res = await db.insert(jsonForms).values({
            jsonform: response,
            createdBy: user?.primaryEmailAddress?.emailAddress!,
            createdDate: moment().format('DD/MM/yyy')
        }).returning({id: jsonForms.id})
        console.log("New form id",res[0].id)
        if(res[0].id){
            router.push(`/edit-form/${res[0].id}`)
        }
      setLoading(false);
    }
    setLoading(false);

  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>+ Create Form</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Form</DialogTitle>
            <DialogDescription>
              <Textarea
                onChange={(event) => setUserInput(event.target.value)}
                className="my-2"
                placeholder="Write description of your form"
              />
              <div className="flex gap-2 my-3 justify-end">
                <DialogClose asChild>
                  <Button variant={"destructive"}>Cancel</Button>
                </DialogClose>
                <Button disabled={loading} onClick={() => onCreateForm()}>Create</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
