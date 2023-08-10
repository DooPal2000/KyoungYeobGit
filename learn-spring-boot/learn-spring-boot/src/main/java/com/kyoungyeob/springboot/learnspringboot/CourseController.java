package com.kyoungyeob.springboot.learnspringboot;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CourseController {
	// / courses
	// Course: id, name, author
	@RequestMapping("/courses")
	public List<Course> retrieveAllCourse() {
		return Arrays.asList(new Course(1, "Learn AWS", "in28minutes"), new Course(2, "Learn DevOps", "in28minutes"),
				new Course(3, "Learn Azure", "in28minutes"));
	}
}
