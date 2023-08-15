package com.kyoungyeob.learnspringframework.game;

public class SuperContraGame implements GamingConsole {
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
