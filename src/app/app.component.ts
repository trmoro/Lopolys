import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import * as THREE from 'three';
import { TrackballControls } from 'three-addons';

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

  ngAfterViewInit(): void {
    const width = window.innerWidth, height = window.innerHeight;

    // init

    const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
    camera.position.z = 1;

    const scene = new THREE.Scene();

    const geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
    const material = new THREE.MeshNormalMaterial();

    const mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    const renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( width, height );
    renderer.setAnimationLoop( animation );
    document.body.appendChild( renderer.domElement );

    const controls = new TrackballControls( camera, renderer.domElement );
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.keys = [ 'KeyA', 'KeyS', 'KeyD' ];


    // animation

    function animation( time: number ) {

      mesh.rotation.x = time / 2000;
      mesh.rotation.y = time / 1000;

      renderer.render( scene, camera );

    }
  }

}
