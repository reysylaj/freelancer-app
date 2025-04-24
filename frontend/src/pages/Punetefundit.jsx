import { useState, useEffect } from "react";
import {
  Box, Typography, Card, CardContent,
  IconButton, TextField, Select, MenuItem,
  FormControl, InputLabel
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TalentProfileViewJobBeforeSubmitProposal from "../components/TalentProfileViewJobBeforeSubmitProposal";
import TalentProfileSendFinalSubmitProposal from "../components/TalentProfileSendFinalSubmitProposal";
import "../styles/Punetefundit.css";

import { getAllJobs } from "../services/jobService";
import {
  saveJobToBackend,
  removeSavedJobFromBackend,
  getSavedJobs,
} from "../services/savedJobService";
import { useAuth } from "../context/AuthContext";

const Punetefundit = () => {
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [likedJobs, setLikedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [openJobPopup, setOpenJobPopup] = useState(false);
  const [openProposalPopup, setOpenProposalPopup] = useState(false);
  const { authUser } = useAuth();
  const talentId = authUser?.id;

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("recent");
  const [filters, setFilters] = useState({
    jobType: "",
    seniorityLevel: "",
    workMode: "",
  });

  useEffect(() => {
    fetchJobs();

    const listener = () => fetchJobs();
    window.addEventListener("jobPostedByClient", listener);
    return () => window.removeEventListener("jobPostedByClient", listener);
  }, [authUser]);

  const fetchJobs = async () => {
    try {
      const jobsFromBackend = await getAllJobs();
      setJobs(jobsFromBackend);

      if (authUser?.role === "talent") {
        const saved = await getSavedJobs();
        const mySaved = saved.filter((s) => s.talentId === authUser.id);
        setSavedJobs(mySaved);
      }
    } catch (error) {
      console.error("❌ Failed to load jobs:", error);
    }
  };

  const handleOpenJobPopup = (job) => {
    if (!authUser) {
      alert("Krijo nje llogari per me shume.");
      return;
    }
    setSelectedJob(job);
    setOpenJobPopup(true);
  };

  const handleCloseJobPopup = () => {
    setOpenJobPopup(false);
    setSelectedJob(null);
  };

  const handleOpenProposalPopup = () => {
    setOpenJobPopup(false);      // Close the view popup
    setOpenProposalPopup(true);  // Open the proposal form
  };

  const handleCloseProposalPopup = () => {
    setOpenProposalPopup(false);
    setSelectedJob(null);
  };

  const handleSaveJob = async (job) => {
    try {
      const alreadySaved = savedJobs.find(j => j.jobId === job.id);
      if (alreadySaved) {
        await removeSavedJobFromBackend(alreadySaved.id);
        setSavedJobs(savedJobs.filter(j => j.jobId !== job.id));
      } else {
        const newSaved = await saveJobToBackend({ jobId: job.id }); // ✅ Only jobId
        setSavedJobs([...savedJobs, newSaved]);
      }
      window.dispatchEvent(new Event("savedJobsUpdated"));
    } catch (error) {
      console.error("❌ Error saving job:", error.response?.data || error.message);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const filteredJobs = jobs
    .filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(job =>
      (!filters.jobType || job.jobType === filters.jobType) &&
      (!filters.seniorityLevel || job.seniorityLevel === filters.seniorityLevel) &&
      (!filters.workMode || job.workMode === filters.workMode)
    )
    .sort((a, b) => sortOption === "recent" ? b.id - a.id : a.id - b.id);

  return (
    <>
      <Header />
      <Box className="punet-fundit-title">
        <h1 className="punet-h1">Punët e fundit</h1>
        <p className="punet-p1">Shih postimet më të fundit nga klientët.</p>
      </Box>

      <Box className="punetefundit-container">
        {/* 🔎 Search and sort */}
        <Box className="search-sort-container">
          <TextField
            fullWidth
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{ startAdornment: <SearchIcon style={{ marginRight: 8 }} /> }}
          />
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <MenuItem value="recent">Most Recent</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* 🎯 Filters */}
        <Box className="content-container">
          <Box className="filters-container">
            <Typography variant="h6">Filtro sipas:</Typography>
            <FormControl fullWidth>
              <InputLabel>Job Type</InputLabel>
              <Select value={filters.jobType} onChange={(e) => handleFilterChange("jobType", e.target.value)}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Full-Time">Full-Time</MenuItem>
                <MenuItem value="Part-Time">Part-Time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
                <MenuItem value="Freelance">Freelance</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Seniority</InputLabel>
              <Select value={filters.seniorityLevel} onChange={(e) => handleFilterChange("seniorityLevel", e.target.value)}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Intern">Intern</MenuItem>
                <MenuItem value="Junior">Junior</MenuItem>
                <MenuItem value="Mid">Mid</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Work Mode</InputLabel>
              <Select value={filters.workMode} onChange={(e) => handleFilterChange("workMode", e.target.value)}>
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="On-Site">On-Site</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* 📦 Jobs */}
          <Box className="jobs-container">
            {filteredJobs.length === 0 ? (
              <Typography className="no-jobs">No jobs available.</Typography>
            ) : (
              filteredJobs.map((job) => (
                <Card key={job.id} className="job-card" onClick={() => handleOpenJobPopup(job)}>
                  <CardContent>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography>{job.description}</Typography>
                    <Typography>Budget: {job.budget} ALL</Typography>
                    <Typography>Type: {job.jobType}</Typography>
                    <Typography>Level: {job.seniorityLevel}</Typography>
                    <Typography>Mode: {job.workMode}</Typography>
                    <Box>
                      <IconButton onClick={(e) => { e.stopPropagation(); handleSaveJob(job); }}>
                        {savedJobs.some(s => s.jobId === job.id) ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        </Box>
      </Box>

      {/* 🔍 Job Detail & Proposal */}
      <TalentProfileViewJobBeforeSubmitProposal job={selectedJob} open={openJobPopup} onClose={handleCloseJobPopup} onSendProposal={handleOpenProposalPopup} />
      <TalentProfileSendFinalSubmitProposal job={selectedJob} open={openProposalPopup} onClose={handleCloseProposalPopup} />

      <Footer />
    </>
  );
};

export default Punetefundit;
