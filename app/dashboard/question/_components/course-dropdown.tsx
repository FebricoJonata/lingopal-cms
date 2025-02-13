import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCourseQuery } from "@/services/course";
import { Course } from "@/types/course";

interface PracticeDropdownProps {
  value: string; // The selected course ID
  onChange: (value: string) => void; // Handler to update modalFormData
}

export function CourseDropdown({ value, onChange }: PracticeDropdownProps) {
  const { data: courses, isLoading } = useCourseQuery(1);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue
          placeholder={isLoading ? "Loading..." : "Select a Course"}
        />
      </SelectTrigger>
      <SelectContent>
        {courses?.map((course: Course) => (
          <SelectItem
            key={course.practice_id}
            value={String(course.practice_id)}
          >
            {course.course_name} (Level {course.practice_code})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
