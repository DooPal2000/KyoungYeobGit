package com.kyoungyeob.learnspringframework;

import com.kyoungyeob.learnspringframework.game.GameRunner;
import com.kyoungyeob.learnspringframework.game.PacmanGame;

public class App01GamingBasicJava {

	public static void main(String[] args) {

//		var game = new MarioGame();
		var game = new PacmanGame(); // 按眉积己 01
		var gameRunner = new GameRunner(game); // 按眉积己 02 + 辆加己 楷搬
		gameRunner.run();
	}
}
