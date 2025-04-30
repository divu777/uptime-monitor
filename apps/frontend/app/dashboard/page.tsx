"use client"
import React, { useState } from 'react';
import { Plus, ActivitySquare } from 'lucide-react';
import { useWebsites } from '@/hooks/useWebsites';
import AddWebsiteModal from '@/components/AddWebsiteModal';
import WebsiteList from '@/components/WebsiteList';
import axios from 'axios';
import { config } from '@/config';
import { useAuth } from '@clerk/clerk-react';

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {websites,getWebsites} = useWebsites();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const {getToken}=useAuth()

  const handleAddWebsite = async (url: string) => {
    try{
      const token =await getToken();
      const result = await axios.post(`${config.BACKEND_URL}/api/v1/create-website`,{
        url,
      },{headers:{
          Authorization:token?`Bearer ${token}`:"",
      }})

      getWebsites()

      if(!result.data.success){
        console.log(result.data.message??"error happend");
      }

      console.log(result.data.message??"added website successfully")

    }catch(err){
      console.log(err)
    }
    console.log('Adding website:', url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <ActivitySquare className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Uptime Monitor</h1>
            </div>
            <button
              onClick={openModal}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none transition-colors"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add Website
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <div className="px-6 py-5">
            <WebsiteList websites={websites} />
          </div>
        </div>
      </main>

      <AddWebsiteModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onAdd={handleAddWebsite}
      />
    </div>
  );
};

export default Dashboard;