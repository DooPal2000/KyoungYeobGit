		const content = "MAXIMIZE \n YOUR FULL \n POTENTIAL";
		const text = document.querySelector(".text");
		let i = 0;

		function typing() {
			let txt = content[i++];
			text.innerHTML += txt === "\n" ? "<br/>" : txt;
			if (i > content.length) {
				text.textContent = "";
				i = 0;
			}
		}
		setInterval(typing, 250)
		
