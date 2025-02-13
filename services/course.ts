import { Course } from "@/types/course";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

export const useCourseQuery = (course_category_id: number) => {
  const fetchCourses = async ({ queryKey }: QueryFunctionContext) => {
    try {
      const [, categoryId] = queryKey; // Extract course_category_id from queryKey

      const url = `https://lingo-pal-backend-v1.vercel.app/api/course/fetch-course-dropdown?course_category_id=${categoryId}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch course: ${response.statusText}`);
      }

      const data = await response.json();

      const courses = data.body.map((course: Course, idx: number) => ({
        idx: idx + 1,
        practice_id: course.practice_id,
        course_name: course.course_name || "-",
        practice_code: course.practice_code || "-",
      }));

      console.log("Fetched Courses: ", courses);

      return courses;
    } catch (error) {
      console.error("Error fetching course: ", error);
      return [];
    }
  };

  return useQuery({
    queryKey: ["course-list", course_category_id],
    queryFn: fetchCourses,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
