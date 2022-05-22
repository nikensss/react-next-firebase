import type { NextPage } from 'next';
import toast from 'react-hot-toast';

const Home: NextPage = () => {
  return (
    <div>
      <button onClick={() => toast.success('Hello, toast!')}>Toast me!</button>
    </div>
  );
};

export default Home;
