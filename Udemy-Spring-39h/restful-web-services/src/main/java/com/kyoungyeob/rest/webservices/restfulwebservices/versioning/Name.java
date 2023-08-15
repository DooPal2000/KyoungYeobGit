package com.kyoungyeob.rest.webservices.restfulwebservices.versioning;

public class Name {
	private String firstName;
	private String secondName;

	public Name(String firstName, String secondName) {
		this.firstName = firstName;
		this.secondName = secondName;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getSecondName() {
		return secondName;
	}

	@Override
	public String toString() {
		return "Name [firstName=" + firstName + ", secondName=" + secondName + "]";
	}

}
