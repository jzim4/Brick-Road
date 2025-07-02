/*
Author: Jonah Zimmer

This file contains the panels that appear in the scrolling path as well as the zoomable forms. 
*/

import React from 'react';

export default function Panel() {
  function zoom(fileName, width) {

    const zoomImg = document.getElementById("zoomImg");
    const zoomImgContainer = document.getElementById("zoomImgContainer");
    zoomImg.src = "/panels/big/IMG_" + fileName + ".jpeg";
    zoomImg.height = 100;
    zoomImg.width = 363/width * 100;

    zoomImg.style.height = "80vh";
    zoomImg.style.height = 363/width * 80 + "vh";

    zoomImgContainer.style.display = "flex";

    magnify(3);
  }

  function closeZoom() {
    const zoomImgContainer = document.getElementById("zoomImgContainer");
    zoomImgContainer.style.display = "none";
  }

  // https://www.w3schools.com/howto/howto_js_image_magnifier_glass.asp
  function magnify(zoom) {
    var img, glass, w, h, bw;
    img = document.getElementById("zoomImg");
  
    /* Create magnifier glass: */
    glass = document.getElementById("img-magnifier-glass");
  
    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);
  
    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
    bw = 3;
    w = (glass.offsetWidth) / 2;
    h = glass.offsetHeight / 2;
  
    /* Execute a function when someone moves the magnifier glass over the image: */
    document.addEventListener("mousemove", moveMagnifier);
  
    /*and also for touch screens:*/
    document.addEventListener("touchmove", moveMagnifier);

    document.addEventListener("click", function(e) {
      if (e.target.id=="zoomImgs" || e.target.id=="zoomImgContainer") {
        closeZoom();
      }
    })

    
    function moveMagnifier(e) {
      var pos, x, y;
      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();
      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);
      x = pos.x;
      y = pos.y;
      
      /* Display what the magnifier glass "sees": */
      const xpos = -1 * ((x * zoom) - w) + "px ";
      const ypos = -1 * ((y * zoom) - h + bw) + "px"
      glass.style.backgroundPosition = xpos + ypos;
    }
  
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }

  return <div id="panelsContainer">
    <div id="zoomImgContainer">
      <button onClick={closeZoom} id="closeZoom">Close</button>
      <div id="zoomImgs">
        <div id="magContainer">
          <div></div>
          <div id="img-magnifier-glass"></div>
        </div>
        <img id="zoomImg"></img>
      </div>
    </div>
      <img onClick={() => zoom(2694, 332.8)} className="panel" width="332.8" height="363" src="/panels/small/IMG_2694.jpeg" style={{marginLeft:"283px"}}></img>
      <img onClick={() => zoom(2698, 326)} className="panel" width="326" height="363" src="/panels/small/IMG_2698.jpeg"></img>
      <img onClick={() => zoom(2700, 326)}className="panel" width="327" height="363" src="/panels/small/IMG_2700.jpeg"></img>
      <img onClick={() => zoom(2701, 326)} className="panel" width="320.7" height="363" src="/panels/small/IMG_2701.jpeg"></img>
      <img onClick={() => zoom(2702, 326)} className="panel" width="326.6" height="363" src="/panels/small/IMG_2702.jpeg"></img>
      <img onClick={() => zoom(2706, 326)} className="panel" width="331" height="363" src="/panels/small/IMG_2706.jpeg"></img>
      <img onClick={() => zoom(2708, 326)} className="panel" width="325" height="363" src="/panels/small/IMG_2708.jpeg"></img>
      <img onClick={() => zoom(2711, 326)} className="panel" width="330" height="363" src="/panels/small/IMG_2711.jpeg"></img>
      <img onClick={() => zoom(2715, 326)} className="panel" width="328" height="363" src="/panels/small/IMG_2715.jpeg"></img>
      <img onClick={() => zoom(2716, 326)} className="panel" width="321" height="363" src="/panels/small/IMG_2716.jpeg"></img>
      <img onClick={() => zoom(2719, 326)} className="panel" width="328" height="363" src="/panels/small/IMG_2719.jpeg"></img>
      <img onClick={() => zoom(2721, 326)} className="panel" width="327" height="363" src="/panels/small/IMG_2721.jpeg"></img>
      <img onClick={() => zoom(2725, 326)} className="panel" width="329" height="363" src="/panels/small/IMG_2725.jpeg"></img>
  </div>
  }