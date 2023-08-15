package com.kyoungyeob.learnspringframework.helloworld;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class App02HelloWorldSpring {

	public static void main(String[] args) {
		// 1. Launch a Spring Context
		try (var context = new AnnotationConfigApplicationContext(HelloWorldConfiguration.class)) {
			// 2. Configure the things that we want Spring to manage -@Configuration
			System.out.println(context.getBean("name"));
			System.out.println(context.getBean("age"));
			System.out.println(context.getBean("person"));
			System.out.println(context.getBean("address2"));

//			System.out.println(context.getBean(Address.class));
			System.out.println(context.getBean("person2MethodCall"));
			System.out.println(context.getBean("person3Parameters"));
			System.out.println(context.getBean("person5Qaulifier"));
		}
		;
//		Arrays.stream(context.getBeanDefinitionNames()).forEach(System.out::println);
	}
}
