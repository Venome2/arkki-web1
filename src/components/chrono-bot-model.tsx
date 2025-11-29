"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ChronoBotModel: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0x7DF9FF, 1.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    const pointLight = new THREE.PointLight(0x4E2A84, 4, 100);
    pointLight.position.set(-5, -5, -2);
    scene.add(pointLight);

    // Bot Model (a composition of shapes)
    const group = new THREE.Group();
    
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: '#1a1a1c', metalness: 0.8, roughness: 0.4 });
    const eyeMaterial = new THREE.MeshStandardMaterial({ color: '#7DF9FF', emissive: '#7DF9FF', emissiveIntensity: 2, toneMapped: false });

    // Main Body
    const bodyGeometry = new THREE.BoxGeometry(2, 2.5, 2);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);
    
    // "Eye"
    const eyeGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eye.position.set(0, 0.5, 1.01);
    group.add(eye);

    // Floating parts
    const floatingPartMaterial = new THREE.MeshStandardMaterial({ color: '#4E2A84', metalness: 0.5, roughness: 0.6 });
    const part1 = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.05, 16, 100), floatingPartMaterial);
    part1.rotation.x = Math.PI / 2;
    group.add(part1);

    const part2 = part1.clone();
    part2.rotation.y = Math.PI / 2;
    group.add(part2);
    
    scene.add(group);

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      
      group.rotation.y = elapsedTime * 0.3;
      part1.rotation.z = elapsedTime * 0.5;
      part2.rotation.z = -elapsedTime * 0.5;
      
      // mouse interaction
      group.rotation.x = Math.sin(elapsedTime * 0.5) * 0.1;


      renderer.render(scene, camera);
    };
    animate();

    // Handle Resize
    const handleResize = () => {
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full rounded-lg overflow-hidden" />;
};

export default ChronoBotModel;
