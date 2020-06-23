import React from 'react';

export default function hud() {
	return (
		<header className = "navbar animated bounceInDown">
			<ul className ="stats">
				<li className = "Level"> Beautiful Typing </li>
				<li className = "score "> Score: 0</li>
				<li className = "Timer hidden"> Time: 0 sec</li>
				<li className = "wpm hidden"> WPM: 0 wpm</li>
				<li className = "maxWpm hidden"> Max WPM: 0 wpm</li>
				<li className ="errors hidden"> Errors: 0 </li>
			</ul>
		</header>
	);
}