import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import * as THREE from 'three';
import { TrackballControls  } from 'three/examples/jsm/controls/TrackballControls.js';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {provide: Window, useValue: window}
  ]
})
export class AppComponent implements AfterViewInit{
  title = 'Lopolys';
  constructor(private window: Window){}

  //After view init
  ngAfterViewInit(): void {
    
    const width = window.innerWidth, height = window.innerHeight;

    // init
    const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( width, height );
    renderer.setAnimationLoop( animation );
    document.body.appendChild( renderer.domElement );

    //Camera control
    const controls = new TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.keys = [ 'KeyA', 'KeyS', 'KeyD' ];

    //On window resize
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }
    window.addEventListener( 'resize', onWindowResize );

    //Instantiate Cube
    let cubes : THREE.Mesh[] = [];
    function instantiateCube() {
      const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
      const material = new THREE.MeshNormalMaterial();
      const mesh = new THREE.Mesh( geometry, material );
      mesh.position.x = Math.random() / 2;
      mesh.position.z = Math.random() / 3;
      scene.add( mesh );
      cubes.push(mesh);

      if(cubes.length > 20) {
        scene.remove(cubes[0]);
        cubes.shift();
      }
    }
    setInterval(instantiateCube, 150);

    //Animation
    function animation( time: number ) {

      requestAnimationFrame( animation );

      cubes.forEach(c => {
        c.rotation.x = time / 5000;
        c.rotation.y = time / 4000;  
        c.position.y += 1 / 8000;
      });

      controls.update();

      renderer.render( scene, camera );

    }
  }

}
