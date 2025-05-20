import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

interface Project {
  title: string;
  description: string;
  images: string[];
  technologies: string[];
}

interface ContentData {
  image: string;
  name: string;
  role: string;
  professionSummary: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  technologies: string[];
  projects: Project[];
}

interface ContentContextType {
  contentData: ContentData | null;
  loading: boolean;
  updateContent: (patch: Partial<ContentData>) => Promise<void>;
}

const ContentContext = createContext<ContentContextType>({
  contentData: null,
  loading: true,
  updateContent: async () => {},
});

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [contentData, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/content');
        // console.log('Contenido cargado:', res.data);
        setContent(res.data);
      } catch (err) {
        console.error('Error cargando contenido:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateContent = async (patch: Partial<ContentData>) => {
    if (!contentData) return;
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/content', { ...contentData, ...patch }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContent((prev) => prev ? { ...prev, ...patch } : prev);
    } catch (err) {
      console.error('Error actualizando contenido:', err);
    }
  };

  return (
    <ContentContext.Provider value={{ contentData, loading, updateContent }}>
      {children}
    </ContentContext.Provider>
  );
};
