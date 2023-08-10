package com.kyoungyeob.learnspringframework;

import com.kyoungyeob.learnspringframework.game.GameRunner;
import com.kyoungyeob.learnspringframework.game.PacmanGame;

public class App01GamingBasicJava {

	public static void main(String[] args) {

//		var game = new MarioGame();
		var game = new PacmanGame(); // ��ü���� 01
		var gameRunner = new GameRunner(game); // ��ü���� 02 + ���Ӽ� ����
		gameRunner.run();
	}
}
