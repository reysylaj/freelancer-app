import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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

    // 👂 Listen to "jobPostedByClient" to refetch after posting
    const listener = () => fetchJobs();
    window.addEventListener("jobPostedByClient", listener);

    return () => {
      window.removeEventListener("jobPostedByClient", listener);
    };
  }, []);


  const fetchJobs = async () => {
    try {
      const jobsFromBackend = await getAllJobs();
      setJobs(jobsFromBackend);

      if (storedUser && storedUser.role === "talent") {
        const saved = await getSavedJobs(); // ✅ Only fetch if talent
        setSavedJobs(saved);

        const userLikedJobs = storedLikedJobs.filter(job => job.talentId === storedUser.id);
        setLikedJobs(userLikedJobs);
      } else {
        setSavedJobs([]); // 👈 or skip it
      }

    } catch (error) {
      console.error("❌ Failed to load jobs:", error);
    }
  };

  const handleOpenJobPopup = (job) => {
    setSelectedJob(job);
    setOpenJobPopup(true);
  };

  const handleCloseJobPopup = () => {
    setOpenJobPopup(false);
    setSelectedJob(null);
  };

  const handleOpenProposalPopup = (job) => {
    setSelectedJob(job);
    setOpenProposalPopup(true);
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
        const updated = savedJobs.filter(j => j.jobId !== job.id);
        setSavedJobs(updated);
        window.dispatchEvent(new Event("savedJobsUpdated"));
      } else {
        const newSaved = await saveJobToBackend({ jobId: job.id });
        const updated = [...savedJobs, newSaved];
        setSavedJobs(updated);
        window.dispatchEvent(new Event("savedJobsUpdated"));
      }
    } catch (error) {
      console.error("❌ Error saving job:", error.response?.data || error.message);
    }
  };



  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredJobs = jobs
    .filter(job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(job =>
      (filters.jobType === "" || job.jobType === filters.jobType) &&
      (filters.seniorityLevel === "" || job.seniorityLevel === filters.seniorityLevel) &&
      (filters.workMode === "" || job.workMode === filters.workMode)
    )
    .sort((a, b) => (sortOption === "recent" ? b.id - a.id : a.id - b.id));

  const handleLikeJob = (job) => {
    let updatedLikedJobs;
    if (likedJobs.some(likedJob => likedJob.id === job.id)) {
      updatedLikedJobs = likedJobs.filter(likedJob => likedJob.id !== job.id);
    } else {
      updatedLikedJobs = [...likedJobs, job];
    }
    setLikedJobs(updatedLikedJobs);
  };

  return (
    <>
      <Header />
      <div className="punet-fundit-title">
        <h1 className="punet-h1">Punet e fundit</h1>
        <p className="punet-p1">
          Ne kete faqe do gjeni te gjitha postimet e fundit qe kane bere klientet dhe qe kerkojne talente me profile te ndryshem.
        </p>
      </div>
      <Box className="punetefundit-container">
        <Box className="search-sort-container">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{ startAdornment: <SearchIcon style={{ marginRight: "8px" }} /> }}
          />

          <FormControl fullWidth variant="outlined">
            <InputLabel>Sort By</InputLabel>
            <Select value={sortOption} onChange={handleSortChange}>
              <MenuItem value="recent">Most Recent</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box className="content-container">
          <Box className="filters-container">
            <Typography variant="h6">Filtroni sipas deshires</Typography>

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
              <InputLabel>Seniority Level</InputLabel>
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
                <MenuItem value="On-Site">On-Site</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box className="jobs-container">
            {filteredJobs.length === 0 ? (
              <Typography className="no-jobs">No jobs available.</Typography>
            ) : (
              filteredJobs.map((job) => (
                <Card key={job.id} className="job-card" onClick={() => {
                  if (!authUser) {
                    alert("Krijo nje llogari per me shume.");
                    return;
                  }
                  handleOpenJobPopup(job);
                }}>

                  <CardContent>
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography className="job-description">{job.description}</Typography>
                    <Typography className="job-user"> Company ID: {job.clientId}</Typography>
                    <Typography className="job-budget"> Budget: {job.budget} ALL</Typography>
                    <Typography className="job-workMode"> Work Mode: {job.workMode}</Typography>
                    <Typography className="job-type"> Job Type: {job.jobType}</Typography>
                    <Typography className="job-seniorityLevel"> Seniority Level: {job.seniorityLevel}</Typography>

                    <Box className="like-container">
                      <IconButton onClick={(e) => { e.stopPropagation(); handleSaveJob(job); }}>
                        {savedJobs.some(savedJob => savedJob.jobId === job.id) ? (
                          <FavoriteIcon color="error" />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))
            )}
          </Box>
        </Box>
      </Box>

      <TalentProfileViewJobBeforeSubmitProposal job={selectedJob} open={openJobPopup} onClose={handleCloseJobPopup} onSendProposal={handleOpenProposalPopup} />
      <TalentProfileSendFinalSubmitProposal job={selectedJob} open={openProposalPopup} onClose={handleCloseProposalPopup} />

      <Footer />
    </>
  );
};

export default Punetefundit;
