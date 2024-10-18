<style>
    .colortab {
        width: 70%;
        text-align: center;
    }
    .colortab th {
        background: #151b23;
        word-wrap: break-word;
        text-align: center;
    }
    .colortab tr:nth-child(1) { background: #000000; }
    .colortab tr:nth-child(2) { background: #FFFFFF; }
    .colortab tr:nth-child(3) { background: #68372B; }
    .colortab tr:nth-child(4) { background: #70A4B2; }
    .colortab tr:nth-child(5) { background: #151b23; }
    .colortab tr:nth-child(6) { background: #6F3D86; }
    .colortab tr:nth-child(7) { background: #588D43; }
    .colortab tr:nth-child(8) { background: #352879; }
    .colortab tr:nth-child(9) { background: #B8C76F; }
    .colortab tr:nth-child(10) { background: #151b23; }
    .colortab tr:nth-child(11) { background: #6F4F25; }
    .colortab tr:nth-child(12) { background: #433900; }
    .colortab tr:nth-child(13) { background: #9A6759; }
    .colortab tr:nth-child(14) { background: #444444; }
    .colortab tr:nth-child(15) { background: #151b23; }
    .colortab tr:nth-child(16) { background: #6C6C6C; }
    .colortab tr:nth-child(17) { background: #9AD284; }
    .colortab tr:nth-child(18) { background: #6C5EB5; }
    .colortab tr:nth-child(19) { background: #959595; }
</style>

# rastereditor

## Screenshot

![AmigaWebGuru-Preview](Docs/image/raster-editor.png)

## description 
A very simple raster bar editor for commodore 64 ( c64 ) raster bars. Exports to a .txt file with dc.b values of the colors. 
This is an very old try - so don´t expect to much of it ;) But if you need some values, it works fine. 
No funky menu - just key usage. 

## usage
the usage is all by keys:

| Key        |                      Function                       | 
|:-----------|:---------------------------------------------------:| 
| +          |                 Zoom UP the canvas                  | 
| -          |                Zoom DOWN the canvas                 | 
| Arrow up   |             moves the Raster Cursor UP              | 
| Arrow down |            moves the Raster Cursor Down             |
| SPACE      |      draws the current Raster Color to canvas       |
| o          | saves the whole canvas as dc.b Data into a txt file |

The colors are selected with just 4 in 1 row on the keys:

* 1 2 3 4
* q w e r
* a s d f
* y x c v

<div class="colortab">

| Key | color | 
|:----|:----|
| 1   |     |
| 2   |     |
| 3   |     |
| 4   |     |
|     |     |
| q   |     |
| w   |     |
| e   |     |
| r   |     |
|     |     |
| a   |     |
| s   |     |
| d   |     |
| f   |     |
|     |     |
| y   |     |
| x   |     |
| c   |     |
| v   |     |

</div>

Like I wrote: an old and simple design, but it does the job if you are not in need of animation;)



