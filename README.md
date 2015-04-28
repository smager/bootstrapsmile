<h2>Welcome to BootstrapSmile</h2>
Customized Templates for bootstrap

<h4>Prerequisites: </h4>
<ul>
    <li>nodejs</li>
    <li>bower</li>
    <li>grunt-cli</li>    
</ul>
<pre>
windows:

 download and install nodejs : https://nodejs.org/download/

 command line:
    npm install bower -g
    npm install grunt-cli -g

linux:
    $ sudo apt-get update
    $ sudo apt-get install nodejs    
    $ sudo npm install bower -g
    $ sudo npm install grunt-cli -g
    $ sudo apt-get install nodejs-legacy

</pre>



<h4>To generate distribution template packages use the command line below: </h4>
<pre>
1.> npm install ( To install node_modules dependencies required on the package.json)
2.> grunt 
</pre>
 
 
<h4>Source Template: </h4>
<pre>
.
`--themes
   |--less(source)
   |  `--{Theme}
   |  `--{Theme}
   |  `--{Theme}
   `--templates
      `--index_template.html

</pre>
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