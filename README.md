Welcome to SpritePlane v1.0!
============================

About
-----

**SpritePlane** is a sprite sheet generator script for Adobe Photoshop that relieves you from many monotonous and 
time-consuming tasks, such as manually dragging and aligning sprite frames, and makes the generation of sprite sheets 
a matter of seconds.

So basically what it does is it converts ![Sprites](http://i.imgur.com/c2MEB.gif "Sprites") 
to ![Sprite sheets](http://i.imgur.com/FDHsu.png "Sprite sheets").

I'm an aspiring video game artist, and while working on my latest project me and my team felt the need of an automated
solution to generating sprite sheets. Most of the scripts we found online were either stand-alone, with external library
dependencies, or lacked the features we were looking for. And so I've decided to develop a script for Photoshop, the tool
we're using in our development, and then release it to the public. I sincerely hope that our script will aid you in your 
development, and improve your sprite workflow.

Questions? Issues? Requests? Found a bug? Just thanks? Hit me up right here in [Issues](https://github.com/mediochrea/SpritePlane/issues), 
by [email](mailto:mediochrea@gmail.com), or on [Polycount](http://www.polycount.com/forum/member.php?u=48535).

Tested on:

* Adobe Photoshop CS5 x86-32
* Adobe Photoshop CS5 x86-64

Features
--------

* Fast, simple workflow via the automation of repetetive tasks
* Two layout planning modes: automatic and manual
* Support for direct Photoshop transparency

Installation
------------

1.  Close Photoshop.
2.  Copy the *SpritePlane.jsx* file to:
    * Windows: *C:\Program Files\Adobe\your_photoshop_version\Presets\Scripts*
    * Mac: *Applications > Your Photoshop Version > Presets > Scripts*
3.  Open Photoshop.
4.  The script should now be accessible from the *File > Scripts* menu.

Usage
-----

1.  Open your sprite in Photoshop (imported animated gifs work perfectly and without any tweaks).
2.  The structure of your document must follow several guidelines:
    * There must be no background layer or locked layers.
    * The layers must be arranged in a way that the first frame of your sprite is on Layer 1, the second — on Layer 2 and so on.
    * Layers with applied styles, masks or adjustments must be rasterized or converted to smart objects (rasterization works best).
3.  Run the script from the *File > Scripts* menu or from the actual *SpritePlane.jsx* file.
4.  Follow the helpful dialogues to generate the sprite sheet.

FAQ
---

* Nothing here. *Yet...*

Future plans
------------

* Less restrictions, more exceptions
* Alpha channel (indirect transparency) support
* Proper GUI, with a more user-friendly look
* More poka-yoke
* Even more useful features, like instant saving, loading multiple images etc.
* Cleaner code with more comments
* A web interface, maybe?

Version history
---------------

<table>
  <tr>
    <th>Version</th><th>Date</th><th>Notes</th>
  </tr>
  <tr>
    <td>1.0</td><td>27.04.2012</td><td>Initial release.</td>
  </tr>
</table>

License
-------

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/">Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License</a>.