import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top header section */}
      <div className="bg-gray-100 border-b-4 border-blue-600 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-3xl md:text-4xl font-bold text-gray-800">
            Built for data integrity
          </h1>
        </div>
      </div>

      {/* Main content section */}
      <div className="bg-slate-800 text-white relative overflow-hidden">
        {/* Background Washington State Patrol Badge */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute -left-44 -bottom-24 w-80 h-80 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px]">
            <img 
              src="/photos/waBadge.png" 
              alt="Washington State Patrol Badge" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-8 leading-relaxed">
              Empowering Authorities to Verify and Validate.
            </h2>

            <div className="mb-12">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-400 mb-2 tracking-wider">
                IDENTITY TOOLKIT
              </h3>
            </div>

            <div className="space-y-8 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
              <p className="font-light">
                This website provides a secure platform for verifying the authenticity of Washington State 
                driver's licenses.
              </p>

              <p className="font-light">
                It conducts high-precision validation by comparing ID information against 
                authoritative sources in real time.
              </p>

              <p className="font-light">
                Preventing identity fraud is critical to public safety and security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;