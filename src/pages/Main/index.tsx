import useUserStore from '@/store/useUserStore';

export default function Main() {
  const { setUser } = useUserStore();

  const click = async () => {
    console.log('click');
    await setUser();
  };
  return (
    <>
      <h2>main 화면</h2>
      <p>여기서 일단 사용자를 선택하게 해야겠군</p>
      <button onClick={click}>클릭</button>
    </>
  );
}
