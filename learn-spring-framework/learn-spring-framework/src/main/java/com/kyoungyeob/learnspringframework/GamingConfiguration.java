package com.kyoungyeob.learnspringframework;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.kyoungyeob.learnspringframework.game.GameRunner;
import com.kyoungyeob.learnspringframework.game.GamingConsole;
import com.kyoungyeob.learnspringframework.game.PacmanGame;

@Configuration
public class GamingConfiguration {

	@Bean
	public GamingConsole game () {
		var game = new PacmanGame();
		return game;
	}
	@Bean
	public GameRunner gameRunner(GamingConsole game) {
		var gameRunner = new GameRunner(game);
		return gameRunner;
	}
}
