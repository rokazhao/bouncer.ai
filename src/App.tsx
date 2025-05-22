import React, { useState } from 'react';

interface AppProps {
  title?: string;
  showBadge?: boolean;
}

const App: React.FC<AppProps> = ({ 
  title = "Built for data integrity", 
  showBadge = true 
}) => {
  // Only keep essential state variables
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const changePage = () => {
    setCurrentPage("fileupload");
    console.log(`Page changed to: fileupload`);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    console.log('File uploaded:', file.name);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          
          .government-serif {
            font-family: 'Crimson Text', 'Times New Roman', serif;
          }
          
          .government-display {
            font-family: 'Playfair Display', 'Times New Roman', serif;
          }
        `}
      </style>
      {currentPage === "home" ? (
        // HOME PAGE
        <>
          {/* Top header section - Fixed height */}
          <div className="bg-gray-100 border-b-4 border-blue-600 py-6 flex-shrink-0">
            <div className="container mx-auto px-4">
              <h1 className="text-center text-3xl md:text-4xl font-normal text-gray-800 government-serif">
                {title}
              </h1>
            </div>
          </div>

          {/* Main content section - Takes remaining space */}
          <div className="bg-slate-800 text-white relative overflow-hidden flex-grow">
            {/* Background Washington State Patrol Badge */}
            {showBadge && (
              <div className="absolute inset-0 opacity-15">
                <div className="fixed -left-52 -bottom-32 w-96 h-96 md:w-[650px] md:h-[650px] lg:w-[750px] lg:h-[750px]">
                  <img 
                    src="/photos/waBadge.png" 
                    alt="Washington State Patrol Badge" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}

            <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 h-full flex items-center justify-center">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-8 leading-relaxed government-serif">
                  Empowering Authorities to Verify and Validate.
                </h2>

                <div className="mb-12">
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-2 tracking-widest" style={{ fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0.2em' }}>
                    IDENTITY TOOLKIT
                  </h3>
                </div>

                <div className="space-y-8 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
                  <p className="font-normal government-serif">
                    This website provides a secure platform for verifying the authenticity of Washington State 
                    driver's licenses.
                  </p>

                  <p className="font-normal government-serif">
                    It conducts high-precision validation by comparing ID information against 
                    authoritative sources in real time.
                  </p>

                  <p className="font-normal government-serif">
                    Preventing identity fraud is critical to public safety and security.
                  </p>
                </div>

                {/* Navigation Button */}
                <div className="mt-12">
                  <button 
                    onClick={changePage}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
                    style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        // FILE UPLOAD PAGE - Same format as homepage
        <>
          {/* Top header section - Same as home */}
          <div className="bg-gray-100 border-b-4 border-blue-600 py-6 flex-shrink-0">
            <div className="container mx-auto px-4">
              <h1 className="text-center text-3xl md:text-4xl font-normal text-gray-800 government-serif">
                {title}
              </h1>
            </div>
          </div>

          {/* Main content section - Same background as home */}
          <div className="bg-slate-800 text-white relative overflow-hidden flex-grow">
            {/* Background Washington State Patrol Badge */}
            {showBadge && (
              <div className="absolute inset-0 opacity-15">
                <div className="fixed -left-52 -bottom-32 w-96 h-96 md:w-[650px] md:h-[650px] lg:w-[750px] lg:h-[750px]">
                  <img 
                    src="/photos/waBadge.png" 
                    alt="Washington State Patrol Badge" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}

            <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 h-full flex items-center justify-center">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal mb-8 leading-relaxed government-serif">
                  Secure Document Verification Portal
                </h2>

                <div className="mb-12">
                  <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-2 tracking-widest" style={{ fontFamily: 'Arial, Helvetica, sans-serif', letterSpacing: '0.2em' }}>
                    UPLOAD CENTER
                  </h3>
                </div>

                <div className="space-y-8 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-12">
                  <p className="font-normal government-serif">
                    Upload your Washington State driver's license for immediate verification and validation.
                  </p>

                  <p className="font-normal government-serif">
                    Our secure system will analyze your document against official state databases.
                  </p>
                </div>

                {/* Upload Box */}
                <div className="max-w-2xl mx-auto mb-8">
                  <div 
                    className={`border-2 border-dashed rounded-lg p-12 transition-all duration-200 cursor-pointer ${
                      isDragOver 
                        ? 'border-yellow-400 bg-yellow-400 bg-opacity-10' 
                        : 'border-gray-400 hover:border-yellow-400 hover:bg-yellow-400 hover:bg-opacity-5'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => document.getElementById('fileInput')?.click()}
                  >
                    <input
                      id="fileInput"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                    
                    {uploadedFile ? (
                      <div className="text-center">
                        <div className="text-green-400 mb-4">
                          <svg className="mx-auto h-16 w-16" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-xl font-semibold text-green-400 mb-2">File Uploaded Successfully</p>
                        <p className="text-gray-300">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-400 mt-2">Size: {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-gray-300 mb-4">
                          <svg className="mx-auto h-16 w-16" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <p className="text-xl font-semibold mb-2">Drop your document here</p>
                        <p className="text-gray-300 mb-2">or click to browse</p>
                        <p className="text-sm text-gray-400">Supported formats: PDF, JPG, PNG (Max 10MB)</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4">
                  <button 
                    onClick={() => setCurrentPage("home")}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
                    style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
                  >
                    Back to Home
                  </button>
                  
                  {uploadedFile && (
                    <button 
                      onClick={() => {
                        console.log('Verifying document:', uploadedFile.name);
                        // Add verification logic here
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-200"
                      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
                    >
                      Verify Document
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;