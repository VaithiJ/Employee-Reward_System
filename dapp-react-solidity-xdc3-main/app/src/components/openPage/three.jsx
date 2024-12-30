import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import employeeImage from "./rewards.jpg";
import "./onavbar.css"

const Three = () => {
  const canvasRef = useRef(null);
  let controls;

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      10,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#000000");
    renderer.setSize(window.innerWidth, window.innerHeight);

    const canvas = canvasRef.current;
    canvas.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.autoRotate = false; // disable auto-rotation

    const textureLoader = new THREE.TextureLoader();
    const employeeTexture = textureLoader.load(employeeImage);

    const geometry = new THREE.CircleGeometry(1, 32); // create a circle geometry
    // const material = new THREE.MeshBasicMaterial({ map: employeeTexture });
    const material = new THREE.MeshPhongMaterial({ map: employeeTexture });
    const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);


    const coin = new THREE.Mesh(geometry, material);
    scene.add(coin);

    window.addEventListener("resize", onWindowResize, false);
    const disc = new THREE.Mesh(geometry, material);
  scene.add(disc);

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        disc.rotation.y += 0.01; // rotate the disc
      
        // adjust camera position and rotation to keep the disc in view
        const distance = 6;
        const angle = disc.rotation.y + Math.PI / 2;
        const x = Math.sin(angle) * distance;
        const z = Math.cos(angle) * distance;
        camera.position.set(x, 0, z);
        camera.lookAt(disc.position);
      
        renderer.render(scene, camera);
      }
      

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate();


  
      return () => {
        window.removeEventListener("resize", onWindowResize, false);
      };
    }, []);
  
    return <div className="background" ref={canvasRef} />;
  };
  

export default Three;
