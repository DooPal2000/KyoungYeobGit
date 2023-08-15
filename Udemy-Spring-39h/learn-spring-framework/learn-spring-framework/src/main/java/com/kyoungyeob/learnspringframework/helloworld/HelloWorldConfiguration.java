package com.kyoungyeob.learnspringframework.helloworld;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

record Person(String name, int age, Address adress) {
};

record Address(String add1, String add2) {
};

@Configuration
public class HelloWorldConfiguration {

	@Bean
	public String name() {
		return "KyoungYeob";
	}

	@Bean
	public int age() {
		return 24;
	}

	@Bean
	public Person person() {
		var person = new Person("JooHyun", 21, new Address("인천광역시", "연수구"));
		return person;
	}

	@Bean
	public Person person2MethodCall() {
		return new Person(name(), age(), address());
	}

	@Bean
	public Person person3Parameters(String name, int age, Address address3) {
		return new Person(name, age, address3);
	}

	@Bean
	@Primary
	public Person person4Parameters(String name, int age, Address address) {
		return new Person(name, age, address);
	}

	@Bean
	public Person person5Qaulifier(String name, int age, @Qualifier("address3qualifier") Address address) {
		return new Person(name, age, address);
	}

	@Bean(name = "address2")
	@Primary
	public Address address() {
		return new Address("사당의", "경훈이의 옥탑방");
	}

	@Bean(name = "address3")
	@Qualifier("address3qualifier")
	public Address address3() {
		return new Address("가산디지털단지의", "디와이스코프코리아");
	}
}
