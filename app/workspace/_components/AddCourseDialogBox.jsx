"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { Loader2Icon, Sparkle } from "lucide-react";
function AddCourseDialogBox({ children }) {
  const [courseForm, setCourseForm] = useState({
    name: "",
    description: "",
    noOfChapters: 1,
    includeVideo: false,
    level: "",
    category: "",
  });

  const [loading, setLoading] = useState(false)

  const handleFormInput = (field, value) => {
    setCourseForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFormClick = async() => {
    const courseId = uuidv4()
     setLoading(true); 
    try{
           const result = await axios.post('/api/create-course-layout', {
      ...courseForm,
      courseId: courseId
    })
     console.log(result.data)
    
    }
    catch (e){
     
      console.log(e)
    }
    finally{ 
       setLoading(false);

    }
    console.log("Generated UUID:", courseId);
  
  };



 

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AI Learning Platform</DialogTitle>
          <DialogDescription>Fill the details to get started</DialogDescription>
        </DialogHeader>

        <div className=" flex flex-col justify-center gap-4 ">
          <div>
            <label htmlFor="">Course Name</label>
            <Input
              onChange={(e) => handleFormInput("name", e.target.value)}
              className={"mt-2"}
              placeholder="enter the course name"
            />
          </div>

          <div>
            <label htmlFor="">Course Description (optional)</label>
            <Textarea
              onChange={(e) => handleFormInput("description", e.target.value)}
              className={"mt-2"}
              placeholder="enter the course description"
            />
          </div>

          <div>
            <label htmlFor="">No of Chapters</label>
            <Input
              onChange={(e) =>
                handleFormInput("noOfChapters", Number(e.target.value))
              }
              className={"mt-2"}
              type={"number"}
            />
          </div>

          <div className="flex items-center gap-5">
            <label htmlFor="">Include Video</label>
            <Switch
              checked={courseForm.includeVideo}
              onCheckedChange={() =>
                handleFormInput("includeVideo", !courseForm?.includeVideo)
              }
            />
          </div>

          <div>
            <label htmlFor=""> Diffuculty Level</label>
            <Select onValueChange={(value) => handleFormInput("level", value)}>
              <SelectTrigger className="w-[180px] mt-2">
                <SelectValue placeholder="Difficulty Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermidate">Intermidate</SelectItem>
                <SelectItem value="advance">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="">Category</label>
            <Input
              onChange={(e) => handleFormInput("category", e.target.value)}
              className={"mt-2"}
              placeholder="Category (Separate by comma)"
            />
          </div>

          <Button disabled={loading} onClick={() => handleFormClick()} className={"mt-2"}>
           {loading ? <Loader2Icon className="animate-spin"/> : <Sparkle/> } Generate Course
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddCourseDialogBox;
