import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Spinner, Center } from '@chakra-ui/react';
import Layout from './components/layout/Layout';

const ToDoPage = lazy(() => import('./components/pages/ToDoPage'));
const PostToDo = lazy(() => import('./components/pages/PostToDo'));

const LoadingSpinner: FC = () => {
  return (
    <Center h="200px">
      <Spinner size="xl" color="pink.500" thickness="4px" />
    </Center>
  );
};

const App: FC = () => {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<ToDoPage />} />
          <Route path="/create" element={<PostToDo />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
