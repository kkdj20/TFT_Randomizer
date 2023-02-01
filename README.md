# TFT_Randomizer

A simple node.js program running in electron that allows you to randomize your TFT cosmetics via LCU API calls. It uses the API to know all the cosmetics you currently own, and then randomly chooses between them. 

# Setup:

Download **tft-randomizer-1.1.0 Setup.exe** from releases, located directly to the right of this page. Only available for Windows at this time.

Run the executable which will install tft-randomizer to **C:\Users\\[User]\AppData\Local\tft_randomizer\tft_randomizer.exe**

Open the League Of Legends client and login; **you must have the client open & logged in before you open tft_randomizer.exe.**

Run tft_randomizer.exe to open up the program as seen below:

![image](https://user-images.githubusercontent.com/11037841/215920627-16cf3438-b049-4b35-bcbf-d031c555eab1.png)

# How to randomize cosmetics:
Use the checkboxes under the "Cosmetics to randomize" header to select which cosmetics you'd like to randomize, then click "Randomize Selection" for the random cosmetics to be automatically equipped in your LoL client. Clicking "Randomize Selection" with the configuration seen below will equip a random Little Legend and a random Arena from those that you own, while your boom will remain unchanged.

![image](https://user-images.githubusercontent.com/11037841/215922214-9f5818b7-5854-419c-8970-815c6eacf384.png)

# How to manage favorites:
On the right side of the window, circled in red below, you'll see the buttons for managing your favorite cosmetics. 

Clicking the save buttons, those in the left column, will take the cosmetics you currently have equipped in the LoL client and save them into a favorite's list. For example, if you equip Chibi Dragonmancer Yasuo then click "Save current Little Legend to Favorites", Chibi Dragonmancer Yasuo will now be part of your Little Legend favorite's list. To remove a cosmetic from your favorite list, simply equip it in-client then click the respective remove button. For example, if you now clicked "Remove current Little Legend from Favorites", Chibi Dragonmancer Yasuo will no longer be on the favorite's list. 

![image](https://user-images.githubusercontent.com/11037841/215921194-dfe6bf55-50f1-47b8-aeab-64a42b25fb1e.png)

# Status Indicator
The text on the bottom of the window under the heading "Status Indicator" will provide information about what the program is currently doing/just finished doing. For example, the following image shows the result of successfully randomizing my Little Legend and Boom. It also counts how many times you randomize each session, because why not?

![image](https://user-images.githubusercontent.com/11037841/215923299-4b33756a-9406-4e48-afea-236c8bcdacc0.png)

# How to randomize only favorites:
To use the favorite's list, tick one of the checkboxes under the "Only use Favorites" heading that is next to the cosmetic you wish to restrict to your favorite's list. In the image below, upon clicking "Randomize Selection", you will have equipped a random little legend from your favorite list, a random arena from your favorite list, and a random boom that you currently own, not restricted to only those marked favorite:

![image](https://user-images.githubusercontent.com/11037841/215923443-96a21ef3-7557-41ba-98be-efc43bf6677a.png)

# How to use loadouts

Loadouts are just a term for a combination of Little Legend + Arena + Boom. If you generate a random Loadout without selecting "Only use Favorites" then it is functionally identical to randomizing your Little Legend, Arena, and Boom separately. However, if you use the favorite's feature, you can store specific combinations of cosmetics and then randomly choose between them. 

For example, if I went into my league client and equipped UFO Sprite, Default Arena, and Hydroblast for my Little Legend, Arena, and Boom respectively, then click "Save Current Loadout to Favorites", that combination will be saved for future use. By clicking "Randomize Selection" with the configuration seen below, you'll randomize between only those combinations you've saved in your favorites. 

![image](https://user-images.githubusercontent.com/11037841/215923504-fc48e80e-5e53-4881-a89f-84e9870a428d.png)

