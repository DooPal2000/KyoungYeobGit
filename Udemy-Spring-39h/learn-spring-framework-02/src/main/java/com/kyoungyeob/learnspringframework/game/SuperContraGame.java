package com.kyoungyeob.learnspringframework.game;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
@Qualifier("SuperContraGameQualifier")

public class SuperContraGame implements GamingConsole {
	@Override
	public void up() {
		System.out.println("up");
	}

	@Override
	public void down() {
		System.out.println("Sit down");
	}

	@Override
	public void left() {
		System.out.println("Go Back");
	}

	@Override
	public void right() {
		System.out.println("Shoot a bullet");
	}

}
