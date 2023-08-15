package com.kyoungyeob.learnspringframework.game;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Component
@Primary

public class MarioGame implements GamingConsole {
	@Override
	public void up() {
		System.out.println("Jump");
	}

	@Override
	public void down() {
		System.out.println("Go to the hole");
	}

	@Override
	public void left() {
		System.out.println("Go Back");
	}

	@Override
	public void right() {
		System.out.println("Accerlate");
	}
}
