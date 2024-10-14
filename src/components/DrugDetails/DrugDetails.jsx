import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DrugDetails.css';
import Loading from '../Loading/Loading';

const DrugDetails = () => {
    const { drugName } = useParams();
    const [drugDetails, setDrugDetails] = useState(null);
    const [ndcs, setNdcs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${drugName}`);

                // Check if the drug details exist
                const details = res.data.drugGroup.conceptGroup[1]?.conceptProperties[0];
                if (details && details.name) {
                    setDrugDetails(details);

                    // Fetch NDCs using the rxcui
                    const ndcRes = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${details.rxcui}/ndcs.json`);
                    
                    // Access the NDCs correctly
                    setNdcs(ndcRes.data.ndcGroup.ndcList.ndc || []);
                } else {
                    alert("Drug does not exist.");
                    navigate('/');
                }
            } catch (err) {
                console.error(err);
                alert("Error while fetching drug details.");
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [drugName, navigate]);

    if (loading) return <Loading />;

    return (
        <div className="drug-details-container">
            {drugDetails ? (
                <div>
                    <h2 className="drug-name">{drugName.charAt(0).toUpperCase() + drugName.slice(1)}</h2>
                    <p className='row'><span className='row-heading'>ID:</span> {drugDetails.rxcui}</p>
                    <p className='row'><span className='row-heading'>Name:</span> {drugDetails.name}</p>
                    <p className='row'><span className='row-heading'>Synonym:</span> {drugDetails.synonym || 'N/A'}</p>
                    <h3 className="associated-ndcs">Associated NDCs</h3>
                    <ul>
                        {ndcs.length > 0 ? (
                            ndcs.map((ndc, index) => (
                                <li key={index} className='row'>{ndc}</li>
                            ))
                        ) : (
                            <li className='row'>No NDCs found.</li>
                        )}
                    </ul>
                </div>
            ) : (
                <div>No drug details available.</div>
            )}
        </div>
    );
};

export default DrugDetails;
