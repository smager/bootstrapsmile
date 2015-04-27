<h2>Welcome to BootstrapSmile</h2>
Customized Templates for bootstrap

<h4>Prerequisites: </h4>
<ul>
    <li>NodeJS</li>
    <li>Bower</li>
</ul>

<h4>To generate distribution template packages use the command line below: </h4>
<p>
1.> npm install (if node_modules not installed)
<br />2.> grunt
</p>
<br />

<h4>Source Template: </h4>
<ul>
    <li>src
        <ul>
            <li>themes
                <ul>
                    <li>bootstrap.less</li>
                    <li>theme.less</li>
                    <li>variable.less</li>
                </ul>
            </li>
            
        </ul>
    </li>
</ul>

<br />


<p>To add theme or edit default theme: <b>themes-config.json</b></p>
<pre>
{
  "defaulTheme" : "theme1",
  "list": {
     "theme1":{}, "theme2":{},"theme3":{}
   }
}
</pre>