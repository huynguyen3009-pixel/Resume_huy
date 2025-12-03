import React, { useState } from 'react';
import { Briefcase, GraduationCap, Award, Layers, User, Loader2, Sparkles, Download, ArrowLeft, Edit3, ImagePlus } from 'lucide-react';
import { ResumeHeader } from './components/ResumeHeader';
import { SectionHeader } from './components/SectionHeader';
import { ExperienceSection } from './components/ExperienceSection';
import { ResumeData, ThemeConfig } from './types';
import { parseResumeWithGemini } from './services/aiService';
import { getRandomTheme, getThemeById } from './utils/themeUtils';

// Default initial state matching the file originally provided for fallback/demo
import { resumeData as initialData } from './data/resumeData';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData | null>(initialData);
  const [inputMode, setInputMode] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(getThemeById('minimal-slate'));
  const [error, setError] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text or paste your resume content.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const data = await parseResumeWithGemini(inputText);
      setResumeData(data);
      setInputMode(false);
      // Pick a random theme on first generation
      setCurrentTheme(getRandomTheme());
    } catch (err) {
      setError("Failed to generate resume. Please try again or check your API Key.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShuffleTheme = () => {
    setCurrentTheme(getRandomTheme());
  };

  const handleDownloadPdf = async () => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    setIsGeneratingPdf(true);
    
    // Access html2pdf from window since it is loaded via script tag
    const html2pdf = (window as any).html2pdf;
    
    if (html2pdf) {
        const opt = {
            margin: 0,
            filename: `Resume-${resumeData?.name.replace(/\s+/g, '-') || 'Generated'}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            // Setting windowWidth to 1280 forces html2canvas to render the desktop view (triggering md: classes)
            // This prevents the layout from collapsing to mobile view (where image is centered) inside the PDF.
            html2canvas: { scale: 2, useCORS: true, scrollY: 0, windowWidth: 1280 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        
        try {
            await html2pdf().set(opt).from(element).save();
        } catch (e) {
            console.error('PDF generation failed', e);
            setError('PDF generation failed. Please try again.');
        } finally {
            setIsGeneratingPdf(false);
        }
    } else {
        console.error("html2pdf library not loaded");
        setIsGeneratingPdf(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Pre-fill input text with the demo data string if empty, for easier testing
  const loadDemoData = () => {
    const demoText = JSON.stringify(initialData, null, 2);
    setInputText(demoText);
  };

  // --- RENDER: INPUT MODE ---
  if (inputMode) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="text-blue-600" size={32} />
            <h1 className="text-3xl font-bold text-gray-900">AI Resume Builder</h1>
          </div>
          
          <p className="text-gray-600 mb-6">
            Paste your current resume, LinkedIn summary, or raw career history below. 
            Our AI will format it into a professional, minimalist resume.
          </p>

          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none font-mono text-sm mb-4 resize-y"
            placeholder="Paste your resume content here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Building Resume...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate Resume
                </>
              )}
            </button>
            
            <button 
              onClick={loadDemoData}
              className="px-4 py-3 text-gray-500 hover:text-gray-700 font-medium underline text-sm"
            >
              Load Example Data
            </button>
            <button
               onClick={() => setInputMode(false)}
               className="px-4 py-3 text-gray-500 hover:text-gray-700 font-medium text-sm"
            >
               Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER: PREVIEW MODE ---
  if (!resumeData) return null;

  return (
    <div className={`min-h-screen p-4 md:p-12 print:p-0 transition-colors duration-500 ${currentTheme.colors.bg} ${currentTheme.font.body}`}>
      
      {/* Floating Toolbar */}
      <div className="fixed top-4 right-4 flex flex-col gap-2 print:hidden z-50">
        <button
          onClick={() => setInputMode(true)}
          className="bg-white shadow-md p-3 rounded-full hover:bg-gray-100 text-gray-700 tooltip"
          title="Edit Data"
        >
          <Edit3 size={20} />
        </button>
        <button
          onClick={handleShuffleTheme}
          className="bg-indigo-600 shadow-md p-3 rounded-full hover:bg-indigo-700 text-white tooltip"
          title="Shuffle Theme"
        >
          <Sparkles size={20} />
        </button>
        <button
          onClick={handleDownloadPdf}
          disabled={isGeneratingPdf}
          className={`${isGeneratingPdf ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} shadow-md p-3 rounded-full text-white tooltip transition-colors`}
          title="Download PDF"
        >
          {isGeneratingPdf ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
        </button>
        <label className="bg-gray-800 shadow-md p-3 rounded-full hover:bg-gray-700 text-white cursor-pointer tooltip" title="Upload Photo">
           <ImagePlus size={20} />
           <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>

      <div id="resume-preview" className="max-w-4xl mx-auto bg-white shadow-xl print:shadow-none p-8 md:p-16 rounded-sm min-h-[1100px]">
        
        {/* Header */}
        <ResumeHeader 
          name={resumeData.name}
          title={resumeData.title}
          contact={resumeData.contact}
          theme={currentTheme}
          profileImage={profileImage || undefined}
        />

        {/* Professional Summary */}
        <section>
          <SectionHeader title="Professional Summary" icon={<User size={24}/>} theme={currentTheme} />
          <p className={`${currentTheme.colors.text} leading-relaxed text-justify`}>
            {resumeData.summary}
          </p>
        </section>

        {/* Experience */}
        <section>
          <SectionHeader title="Work Experience" icon={<Briefcase size={24}/>} theme={currentTheme} />
          <ExperienceSection data={resumeData.experience} theme={currentTheme} />
        </section>

        <div className={`grid grid-cols-1 ${currentTheme.layout === 'modern' ? 'md:grid-cols-2 gap-8' : 'gap-4'} mt-4`}>
          
          {/* Education & Certs */}
          <div className="space-y-2">
            <section>
              <SectionHeader title="Education" icon={<GraduationCap size={24}/>} theme={currentTheme} />
              <div className="space-y-4">
                {resumeData.education.map((edu, idx) => (
                  <div key={idx}>
                    <h3 className={`font-bold ${currentTheme.colors.primary}`}>{edu.school}</h3>
                    <div className={`${currentTheme.colors.text}`}>{edu.degree}</div>
                    <div className={`text-sm italic ${currentTheme.colors.secondary}`}>{edu.period}</div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-8">
              <SectionHeader title="Certifications" icon={<Award size={24}/>} theme={currentTheme} />
              <ul className="space-y-3">
                {resumeData.certifications.map((cert, idx) => (
                  <li key={idx} className="flex flex-col">
                    <span className={`font-semibold ${currentTheme.colors.primary}`}>{cert.name}</span>
                    <span className={`text-sm ${currentTheme.colors.secondary}`}>{cert.status}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Core Competencies */}
          <section>
            <SectionHeader title="Core Competencies" icon={<Layers size={24}/>} theme={currentTheme} />
            <div className="space-y-5">
              {resumeData.competencies.map((comp, idx) => (
                <div key={idx}>
                  <h4 className={`font-bold text-sm uppercase mb-1 border-b pb-1 ${currentTheme.colors.primary} ${currentTheme.colors.accent.replace('border-', 'border-opacity-20 border-')}`}>
                    {comp.category}
                  </h4>
                  <p className={`text-sm leading-relaxed ${currentTheme.colors.text}`}>
                    {comp.skills}
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
      
      {/* Footer / Print Instructions */}
      <footer className="max-w-4xl mx-auto mt-8 text-center text-gray-400 text-sm no-print">
        <p>Use the buttons on the top right to customize or download.</p>
      </footer>
    </div>
  );
};

export default App;