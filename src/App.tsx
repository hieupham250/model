import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import ModelWithTextures from "./components/ModelWithTextures";

export default function App() {
  return (
    <Canvas
      style={{ width: "100vw", height: "100vh" }}
      camera={{ position: [0, 2, 5], fov: 75 }}
    >
      <ambientLight intensity={1} />
      <directionalLight position={[5, 10, 5]} />
      <OrbitControls />
      <ModelWithTextures />
    </Canvas>
  );
}
