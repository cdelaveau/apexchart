import React from "react";
import './NavPage.css'



function NavPage() {
    return (
    <nav class="nav">
        <div class="container">
            <div class="logo">
                <a href="/">AnimeStats</a>
            </div>
            <div id="mainListDiv" class="main_list">
                <ul class="navlinks">
                    <li><a href="/graph">Graphiques</a></li>
                    <li><a href="/about">A propos</a></li>
                </ul>
            </div>
        </div>
    </nav>
    );
}

export default NavPage;


