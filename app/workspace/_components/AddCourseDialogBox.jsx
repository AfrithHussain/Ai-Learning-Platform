// File: where your AddCourseDialogBox component is located.

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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoaderOverlay from "@/components/LoaderOverlay";

function AddCourseDialogBox({ children }) {
  const [open, setOpen] = useState(false);
  const [courseForm, setCourseForm] = useState({
    name: "",
    description: "",
    noOfChapters: 0,
    includeVideo: false,
    level: "",
    category: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const coursePath = useRouter();

  const handleFormInput = (field, value) => {
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    setCourseForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!courseForm.name.trim()) {
      newErrors.name = "Course name is required.";
    }
    if (courseForm.noOfChapters <= 0 ) {
      newErrors.noOfChapters = "Please enter a valid number of chapters.";
    }
    if (courseForm.noOfChapters >=13 ) {
      newErrors.noOfChapters = "Maximum chapters reached";
    }
    if (!courseForm.level) {
      newErrors.level = "Please select a difficulty level.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormClick = async () => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    // THIS IS THE ONLY LINE ADDED!
    // It closes the dialog box immediately.
    setOpen(false);

    const courseId = uuidv4();
    setLoading(true);
    try {
      const result = await axios.post('/api/create-course-layout', {
        ...courseForm,
        courseId: courseId
      });
      
      // We no longer need setOpen(false) here because it's already closed.
      if (result.data.resp === 'Course limit reached') {
        toast.warning('Please Subscribe to plan');
        coursePath.replace('/workspace/billing');
        return;
      }

      coursePath.push('/workspace/edit-course/' + result?.data?.courseId);

    } catch (e) {
      console.log(e);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoaderOverlay isLoading={loading} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Learning Platform</DialogTitle>
            <DialogDescription>Fill the details to get started</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col justify-center gap-4">
            {/* ... all your input fields remain exactly the same ... */}
            <div>
              <label htmlFor="courseName">Course Name</label>
              <Input
                id="courseName"
                onChange={(e) => handleFormInput("name", e.target.value)}
                className="mt-2"
                placeholder="enter the course name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="courseDesc">Course Description (optional)</label>
              <Textarea
                id="courseDesc"
                onChange={(e) => handleFormInput("description", e.target.value)}
                className="mt-2"
                placeholder="enter the course description"
              />
            </div>

            <div>
              <label htmlFor="chapters">No of Chapters (1 to 12)</label>
              <Input
                id="chapters"
                onChange={(e) => handleFormInput("noOfChapters", Number(e.target.value))}
                className="mt-2"
                type="number"
              />
              {errors.noOfChapters && <p className="text-red-500 text-sm mt-1">{errors.noOfChapters}</p>}
            </div>

            <div className="flex items-center gap-5">
              <label htmlFor="includeVideo">Include Video</label>
              <Switch
                id="includeVideo"
                checked={courseForm.includeVideo}
                onCheckedChange={() =>
                  handleFormInput("includeVideo", !courseForm.includeVideo)
                }
              />
            </div>

            <div>
              <label htmlFor="level">Difficulty Level</label>
              <Select onValueChange={(value) => handleFormInput("level", value)}>
                <SelectTrigger className="w-[180px] mt-2">
                  <SelectValue placeholder="Difficulty Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advance">Advanced</SelectItem>
                </SelectContent>
              </Select>
              {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <Input
                id="category"
                onChange={(e) => handleFormInput("category", e.target.value)}
                className="mt-2"
                placeholder="Category (Separate by comma)"
              />
            </div>

            <Button disabled={loading} onClick={handleFormClick} className="mt-2 cursor-pointer">
              {loading ? <Loader2Icon className="animate-spin " /> : <Sparkle />} Generate Course
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default AddCourseDialogBox;