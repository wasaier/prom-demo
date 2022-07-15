import styles from './index.less';

function test() {
  alert(111);
}

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <button onClick={() => {
        console.error(111)
        test()
        // window.location.href = "https://www.baidu.com"
      }}>onClick</button>
    </div>
  );
}
