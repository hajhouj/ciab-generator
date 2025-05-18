import React, { useState } from 'react';
import { readExcelData } from '../utils/excelReader';
import { generatePDF } from '../utils/pdfGenerator';
import { defaultLayoutData } from '../utils/layoutData';

const Generator = () => {
  const [dataFile, setDataFile] = useState<File | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [documentType, setDocumentType] = useState('new');
  const [statusMessage, setStatusMessage] = useState('');

  const handleDataFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDataFile(e.target.files[0]);
    }
  };

  const handleGenerate = async () => {
    if (!dataFile) {
      setStatusMessage('Veuillez sélectionner un fichier Excel');
      return;
    }

    setIsGenerating(true);
    setStatusMessage('Traitement des données...');

    try {
      // Get data from file
      const dataRows = await readExcelData(dataFile);

      // Generate PDF using the embedded layout data
      const isDuplicata = documentType === 'duplicata';
      const pdfBlob = await generatePDF(dataRows, defaultLayoutData, isDuplicata, false);

      // Create download link
      const url = URL.createObjectURL(pdfBlob);
      const timestamp = new Date().toISOString().replace(/[:T]/g, '_').split('.')[0];
      const fileName = `CIAB_${documentType}_${timestamp}.pdf`;
      
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setStatusMessage('PDF généré avec succès !');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      setStatusMessage(`Erreur: ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>

      <div className="mb-8 rounded-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-primary to-primaryLight p-5 text-white">
          <h3 className="text-lg font-semibold">Source de données</h3>
          <p className="text-white text-opacity-80 text-sm mt-1">
            Téléchargez un fichier Excel contenant vos données pour la génération PDF
          </p>
        </div>
        
        <div className="p-6 bg-white">
          <div className="flex items-center">
            <div className="flex-grow">
              <label className="w-full">
                <div className="flex">
                  <div className="flex-1 py-3 px-4 bg-lightGray rounded-l-lg truncate text-textSecondary border border-r-0 border-gray-200">
                    {dataFile ? dataFile.name : 'Aucun fichier sélectionné'}
                  </div>
                  <label className="cursor-pointer bg-primary hover:bg-primaryDark transition-colors text-white py-3 px-6 rounded-r-lg font-medium flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    Parcourir
                    <input
                      type="file"
                      accept=".xlsx"
                      className="hidden"
                      onChange={handleDataFileChange}
                    />
                  </label>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-xl overflow-hidden border border-gray-100">
        <div className="bg-gradient-to-r from-primary to-primaryLight p-5 text-white">
          <h3 className="text-lg font-semibold">Type de document</h3>
          <p className="text-white text-opacity-80 text-sm mt-1">
            Sélectionnez le type de document que vous souhaitez générer
          </p>
        </div>
        
        <div className="p-6 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${documentType === 'new' ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-primary'}`}>
              <input
                type="radio"
                name="documentType"
                value="new"
                checked={documentType === 'new'}
                onChange={() => setDocumentType('new')}
                className="mr-3 text-primary focus:ring-primary"
              />
              <div>
                <div className="font-medium text-textPrimary">Nouvelle Identification</div>
                <div className="text-sm text-textSecondary mt-1">Générer de nouveaux documents d'identification</div>
              </div>
            </label>
            
            <label className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${documentType === 'duplicata' ? 'border-primary bg-primary bg-opacity-5' : 'border-gray-200 hover:border-primary'}`}>
              <input
                type="radio"
                name="documentType"
                value="duplicata"
                checked={documentType === 'duplicata'}
                onChange={() => setDocumentType('duplicata')}
                className="mr-3 text-primary focus:ring-primary"
              />
              <div>
                <div className="font-medium text-textPrimary">Duplicata</div>
                <div className="text-sm text-textSecondary mt-1">Générer des documents duplicata avec filigrane</div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div className={`p-5 mb-6 rounded-xl border ${statusMessage.includes('Erreur') ? 'bg-red-50 border-red-200 text-red-600' : 'bg-green-50 border-green-200 text-green-600'}`}>
          <div className="flex">
            {statusMessage.includes('Erreur') ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
            {statusMessage}
          </div>
        </div>
      )}

      <button
        onClick={handleGenerate}
        disabled={!dataFile || isGenerating}
        className="w-full bg-primary hover:bg-primaryDark disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-medium text-lg shadow-button transition-all duration-200 transform hover:translate-y-[-2px] flex items-center justify-center"
      >
        {isGenerating ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Génération du PDF...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Générer le PDF
          </>
        )}
      </button>
      
      <div className="mt-6 p-5 bg-lightGray rounded-xl border border-gray-200">
        <h4 className="font-medium text-textPrimary text-sm mb-2">Informations sur les CIAB:</h4>
        <ul className="list-disc pl-5 text-xs text-textSecondary space-y-2">
          <li>Les informations générées incluent: le NNI (Numéro National d'Identification), le nom du propriétaire, le numéro de pièce d'identité, l'adresse, la race, la date de naissance et le sexe de l'animal.</li>
          <li>Les positions des éléments sont calibrées en millimètres pour correspondre précisément aux exigences officielles.</li>
        </ul>
      </div>
    </div>
  );
};

export default Generator; 