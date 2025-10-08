import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function ModelWithTextures() {
  const { nodes } = useGLTF("/hoangthanhtest3.glb");

  const textureGroups: Record<string, string[]> = {
    "/anh-dep-6.jpg": ["_3DGeom6656350", "_3DGeom6656352"],
    "/anh-dep-8.jpg": ["_3DGeom6656351"],
    "/anh-dep-11.jpg": ["_3DGeom6656353"],
    "/anh-dep-13.jpg": ["_3DGeom6656354"],
    "/anh-dep-14.jpg": ["_3DGeom6656355"],
    "/anh-dep-15.jpg": ["_3DGeom6656356"],
  };

  const texturePaths = Object.fromEntries(
    Object.keys(textureGroups).map((path) => [path, path])
  );

  const textures = useTexture(texturePaths);

  const meshToTexture: Record<string, THREE.Texture> = {};
  for (const [path, meshNames] of Object.entries(textureGroups)) {
    const texture = textures[path];
    meshNames.forEach((name) => {
      meshToTexture[name] = texture;
    });
  }

  const meshes = Object.values(nodes).filter(
    (n): n is THREE.Mesh => (n as THREE.Mesh).isMesh
  );

  // console.log(
  //   "Tất cả mesh:",
  //   meshes.map((m) => m.name)
  // );

  return (
    // lấy texture theo tên mesh
    <group dispose={null} scale={0.1}>
      {meshes.map((mesh) => {
        const texture = meshToTexture[mesh.name];
        // console.log(
        //   "Mesh name:",
        //   mesh.name,
        //   "-> Texture:",
        //   texture?.image?.src || "none"
        // );
        return (
          <mesh
            key={mesh.uuid}
            geometry={mesh.geometry}
            position={mesh.position}
            rotation={mesh.rotation}
            scale={mesh.scale}
          >
            <meshStandardMaterial
              map={texture ?? null}
              // roughness={0.6} // Độ nhám
              // metalness={0.3} // Độ kim loại
            />
          </mesh>
        );
      })}
    </group>
  );
}
