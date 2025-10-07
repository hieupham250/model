import { useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function ModelWithTextures() {
  const { nodes } = useGLTF("/hoangthanhtest3.glb");

  const textures = useTexture([
    "/anh-dep-6.jpg",
    "/anh-dep-8.jpg",
    "/anh-dep-11.jpg",
    "/anh-dep-13.jpg",
    "/anh-dep-14.jpg",
    "/anh-dep-15.jpg",
    "/anh-dep-16.jpg",
  ]);

  // Map tên mesh → texture (Cần viết map tên mesh → texture, nếu số lượng mesh lớn sẽ hơi tốn thời gian)
  const textureMap: Record<string, THREE.Texture> = {
    _3DGeom6656350: textures[0],
    _3DGeom6656351: textures[1],
    _3DGeom6656352: textures[2],
    _3DGeom6656353: textures[3],
    _3DGeom6656354: textures[4],
    _3DGeom6656355: textures[5],
    _3DGeom6656356: textures[6],
    // … có thể thêm các map khác nếu cần
  };

  const meshes = Object.values(nodes).filter((n) => n.isMesh) as THREE.Mesh[];

  return (
    <group dispose={null}>
      {/* Rủi ro nhầm texture nếu thứ tự Object.values(nodes) không khớp thứ tự mong muốn */}
      {meshes.map((mesh, index) => {
        const newMesh = mesh.clone();
        newMesh.material = new THREE.MeshStandardMaterial({
          map: textures[index % textures.length],
          roughness: 0.1, // độ nhám
          metalness: 0.3, // độ kim loại
        });
        return <primitive key={mesh.uuid} object={newMesh} />;
      })}
    </group>

    // lấy texture theo tên mesh
    // <group dispose={null}>
    //   {meshes.map((mesh) => {
    //     const texture = textureMap[mesh.name];
    //     return (
    //       <mesh
    //         key={mesh.uuid}
    //         geometry={mesh.geometry}
    //         position={mesh.position}
    //         rotation={mesh.rotation}
    //         scale={mesh.scale}
    //       >
    //         <meshStandardMaterial
    //           map={texture ?? null}
    //           roughness={0.6}
    //           metalness={0.3}
    //         />
    //       </mesh>
    //     );
    //   })}
    // </group>
  );
}
