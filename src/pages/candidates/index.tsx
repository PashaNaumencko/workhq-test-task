import { Candidate, getCandidates } from "@/helpers/get-candidates";
import { Autocomplete } from "@/components/autocomplete";
import { useCallback, useEffect, useState } from "react";
import { CandidateCard } from "@/components/candidate-card";

export default function Candidates() {
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const handleChange = (searchQuery: string) => {
    handleGetCandidates(searchQuery)
  }

  const handleSelectCandidate = (selectedCandidate: Candidate) => {
    setSelectedCandidates([...selectedCandidates, selectedCandidate])
    setCandidates(candidates.filter(candidate => candidate.id !== selectedCandidate.id))
  }

  const handleRemoveCandidate = useCallback((removedCandidate: Candidate) => () => {
    setSelectedCandidates(selectedCandidates.filter(candidate => candidate.id !== removedCandidate.id));
    setCandidates([...selectedCandidates, removedCandidate])
  }, [selectedCandidates]);

  const handleGetCandidates = (searchQuery?: string) => {
    getCandidates(searchQuery).then((candidates) => setCandidates(candidates))
  }

  useEffect(() => {
    handleGetCandidates()
  }, [])

  return (
    <>
      <Autocomplete<Candidate> 
        selectedItems={selectedCandidates}
        items={candidates} 
        onChange={handleChange} 
        onSelectionChanged={handleSelectCandidate} 
        label="Search" 
        placeholder="Michael Jordan..." 
        renderItem={(candidate) => <span>{candidate.firstName} {candidate.lastName}</span>} 
      />

      <div className="flex flex-col gap-4 mt-4">
        {selectedCandidates.map((candidate) => (
          <CandidateCard key={candidate.id} item={candidate} onRemoveItem={handleRemoveCandidate} />
        ))}
      </div>
    </>
  );
}