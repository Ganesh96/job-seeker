import React, { useState, useEffect } from 'react';

// Custom Modal Component for messages (replaces alert())
const Modal = ({ message, onClose }) => {
  if (!message) return null; // Don't render if there's no message

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <p className="text-lg font-semibold text-gray-800 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        >
          OK
        </button>
      </div>
    </div>
  );
};

// Splash Screen Component
const SplashScreen = () => {
  return (
    // Ensure splash screen also has the radial gradient background
    <div
      className="min-h-screen flex items-center justify-center text-3xl sm:text-5xl font-extrabold animate-fade-in-grow"
      style={{
        background: 'radial-gradient(circle at center, #2e66ff 0%, #000a40 100%)' // Radial gradient from the screenshot
      }}
    >
      <p className="text-center px-4 text-white">Hi Seeker,<br/>Thanks for being part of the community</p>
    </div>
  );
};

// Main App Component
const App = () => {
  // State to manage the current view
  const [currentView, setCurrentView] = useState('home'); // 'home', 'add', 'update'
  const [showSplash, setShowSplash] = useState(true); // State to control splash screen visibility
  const [modalMessage, setModalMessage] = useState(''); // State for custom modal messages

  // Effect to manage splash screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Display splash screen for 3 seconds
    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  // Function to navigate between different views (for internal app views)
  const navigate = (view) => {
    setCurrentView(view);
  };

  // Function to show custom modal
  const showCustomModal = (message) => {
    setModalMessage(message);
  };

  // Function to close custom modal
  const closeCustomModal = () => {
    setModalMessage('');
  };

  // If splash screen is active, render only the splash screen
  if (showSplash) {
    return <SplashScreen />;
  }

  // Render the main navigation sections when currentView is 'home'
  if (currentView === 'home') {
    return (
      <div className="min-h-screen flex flex-row font-sans text-white">
        {/* View Job Opportunity Panel - Mild Blue */}
        <button
          onClick={() => window.open('https://github.com/Ganesh96/job-plenty/blob/main/README.md', '_blank')} // Direct redirect to readme.md
          className="flex-1 flex items-center justify-center text-4xl font-bold transition-all duration-300 hover:brightness-110 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-blue-400"
          style={{
            background: 'radial-gradient(circle at center, #2e66ff 0%, #000a40 100%)', // Radial gradient
            backgroundColor: 'rgba(173, 216, 230, 0.7)', // Mild Blue (LightBlue) with transparency
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)' // Border for separation
          }}
        >
          👀 View Job Opportunity
        </button>

        {/* Add Job Opportunity Panel - Mild Green */}
        <button
          onClick={() => navigate('add')}
          className="flex-1 flex items-center justify-center text-4xl font-bold transition-all duration-300 hover:brightness-110 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-lime-400"
          style={{
            background: 'radial-gradient(circle at center, #2e66ff 0%, #000a40 100%)', // Radial gradient
            backgroundColor: 'rgba(152, 251, 152, 0.7)', // Mild Green (PaleGreen) with transparency
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)' // Border for separation
          }}
        >
          ➕ Add Job Opportunity
        </button>

        {/* Update/Delete Job Opportunity Panel - Mild Orange+Red */}
        <button
          onClick={() => navigate('update')}
          className="flex-1 flex items-center justify-center text-4xl font-bold transition-all duration-300 hover:brightness-110 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-red-400"
          style={{
            background: 'radial-gradient(circle at center, #2e66ff 0%, #000a40 100%)', // Radial gradient
            backgroundColor: 'rgba(255, 127, 80, 0.7)', // Mild Orange+Red (Coral) with transparency
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)' // No border-right for the last one
          }}
        >
          ✏️❌ Update/Delete Job Opportunity
        </button>

        {/* Render the custom modal */}
        <Modal message={modalMessage} onClose={closeCustomModal} />
      </div>
    );
  }

  // Render the specific job view (add, update) when not in 'home' view
  return (
    <div
      className="min-h-screen font-sans text-gray-800 p-4 sm:p-8 flex items-center justify-center"
      style={{
        background: 'radial-gradient(circle at center, #2e66ff 0%, #000a40 100%)' // Apply to the container holding job details
      }}
    >
      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl max-w-4xl w-full">
        {currentView === 'add' && <AddJob navigate={navigate} showModal={showCustomModal} />}
        {currentView === 'update' && <UpdateJob navigate={navigate} showModal={showCustomModal} />}
      </div>
      {/* Render the custom modal */}
      <Modal message={modalMessage} onClose={closeCustomModal} />
    </div>
  );
};

// View Jobs Component (Kept for completeness, though main button now redirects directly)
const ViewJobs = ({ navigate, showModal }) => { // showModal is unused here in current setup
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This section would be used if you wanted to fetch and display readme.md content INSIDE the app.
    // As per the latest request, the "View Job Opportunity" button redirects directly to GitHub.
    // So, this component won't be actively used from the main navigation.
    const simulateFetchReadme = () => {
      setLoading(true);
      setError(null);
      setTimeout(() => {
        const mockReadmeContent = `
# Job Postings

Here's a list of exciting job opportunities!

- **JP1**: Software Engineer at Google ([Apply Here](https://careers.google.com/jobs/results/))
- **JP2**: Product Manager at Microsoft ([Apply Here](https://careers.microsoft.com/v2/global/en/home.html))
- **JP3**: Data Scientist at Amazon ([Apply Here](https://www.amazon.jobs/))
- **JP4**: UX Designer at Apple ([Apply Here](https://jobs.apple.com/))
- **JP5**: DevOps Engineer at Netflix ([Apply Here](https://jobs.netflix.com/))
`;
        const parsedJobs = parseReadmeContent(mockReadmeContent);
        setJobs(parsedJobs);
        setLoading(false);
      }, 1500); // Simulate network delay
    };

    simulateFetchReadme();
  }, []);

  // Function to parse the markdown content and extract job entries
  const parseReadmeContent = (content) => {
    const lines = content.split('\n');
    const jobEntries = [];
    lines.forEach(line => {
      const match = line.match(/^- \*\*JP(\d+)\*\*: (.+) at (.+) \(\[Apply Here\]\((.+)\)\)/);
      if (match) {
        jobEntries.push({
          id: `JP${match[1]}`,
          position: match[2],
          company: match[3],
          link: match[4]
        });
      }
    });
    return jobEntries;
  };

  if (loading) {
    return <div className="text-center text-indigo-600 text-lg py-10">Loading job opportunities...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 text-lg py-10">Error loading jobs: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Available Job Opportunities</h2>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-600 py-10">No job opportunities found. Please check back later or add one!</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-blue-50 p-5 rounded-lg shadow-md border border-blue-200">
              <h3 className="text-xl font-semibold text-indigo-800 mb-2">{job.position}</h3>
              <p className="text-lg text-gray-700 mb-1">Company: <span className="font-medium">{job.company}</span></p>
              <p className="text-md text-gray-600 mb-3">ID: <span className="font-mono bg-blue-100 px-2 py-1 rounded-md">{job.id}</span></p>
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300"
              >
                Apply Now
              </a>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => navigate('home')}
        className="mt-8 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-300 w-full"
      >
        Back to Home
      </button>
    </div>
  );
};

// Add Job Component
const AddJob = ({ navigate, showModal }) => {
  // Personal Access Token is now read from environment variable
  const personalAccessToken = process.env.REACT_APP_GITHUB_TOKEN;

  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(false);

  const REPO_OWNER = 'Ganesh96';
  const REPO_NAME = 'job-plenty'; // Assuming the issue is created in job-plenty for jobs

  const createGitHubIssue = async (e) => {
    e.preventDefault();
    if (!personalAccessToken) {
      showModal('GitHub Personal Access Token not found. Please set REACT_APP_GITHUB_TOKEN in your .env file.');
      return;
    }
    if (!position || !company || !link) {
      showModal('Please fill in all job details.');
      return;
    }

    setLoading(true);

    // Autogenerate JPID using a timestamp for high uniqueness on client-side
    const newJobId = `JP${Date.now()}`;

    const issueTitle = `Add Job: ${position} at ${company} (${newJobId})`;
    const issueBody = `
### New Job Opportunity Request: ${newJobId}

**Company Name:** ${company}
**Position Name:** ${position}
**Job Link:** ${link}
**Autogenerated JPID:** ${newJobId}

---
*This issue was created via the Job Opportunities Portal application.*
*A collaborator should verify this information and add it to the \`readme.md\` file.*
`;

    try {
      const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${personalAccessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify({
          title: issueTitle,
          body: issueBody,
          labels: ['add-job'] // Label as requested
        })
      });

      if (response.ok) {
        const data = await response.json();
        showModal(`Successfully created GitHub Issue #${data.number}: ${data.title}`);
        // Clear form fields after successful creation
        setPosition('');
        setCompany('');
        setLink('');
      } else {
        const errorData = await response.json();
        showModal(`Error creating issue: ${response.status} - ${errorData.message || 'Unknown error'}. Ensure your token has 'repo' scope and the repository is correct.`);
      }
    } catch (error) {
      showModal(`Network error: ${error.message}. Make sure you are online and GitHub API is reachable.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">Add New Job Opportunity</h2>
      <form onSubmit={createGitHubIssue} className="space-y-4">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            id="company"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position Name</label>
          <input
            type="text"
            id="position"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">Job Link</label>
          <input
            type="url"
            id="link"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Creating Issue...' : 'Create GitHub Issue'}
        </button>
      </form>

      <button
        onClick={() => navigate('home')}
        className="mt-8 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-300 w-full"
      >
        Back to Home
      </button>
    </div>
  );
};

// Update Job Component
const UpdateJob = ({ navigate, showModal }) => {
  // Personal Access Token is now read from environment variable
  const personalAccessToken = process.env.REACT_APP_GITHUB_TOKEN;

  const [jpId, setJpId] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [positionName, setPositionName] = useState('');
  const [actionType, setActionType] = useState('edit'); // 'edit' or 'delete'
  const [loading, setLoading] = useState(false);

  const REPO_OWNER = 'Ganesh96';
  const REPO_NAME = 'job-plenty'; // Assuming the issue is created in job-plenty for jobs

  const handleUpdateDeleteIssue = async (e) => {
    e.preventDefault();
    if (!personalAccessToken) {
      showModal('GitHub Personal Access Token not found. Please set REACT_APP_GITHUB_TOKEN in your .env file.');
      return;
    }
    if (!jpId || !actionType) {
      showModal('Please provide JP ID and select an action type.');
      return;
    }

    if (actionType === 'edit' && (!jobLink || !companyName || !positionName)) {
      showModal('For editing, please fill in all fields: New Job Link, New Company Name, and New Position Name.');
      return;
    }

    setLoading(true);

    let issueTitle = '';
    let issueBody = '';
    let labels = [];

    if (actionType === 'edit') {
        issueTitle = `Update Job: ${jpId}`;
        issueBody = `
### Update Job Opportunity Request: ${jpId}

**Action Type:** Edit
**JP ID to Update:** ${jpId}
**New Company Name:** ${companyName}
**New Position Name:** ${positionName}
**New Job Link:** ${jobLink}

---
*This issue was created via the Job Opportunities Portal application.*
*A collaborator should verify this information and update the entry for \`${jpId}\` in the \`readme.md\` file.*
`;
        labels = ['update-job']; // Label as requested
    } else if (actionType === 'delete') {
        issueTitle = `Delete Job: ${jpId}`;
        issueBody = `
### Delete Job Opportunity Request: ${jpId}

**Action Type:** Delete
**JP ID to Delete:** ${jpId}

---
*This issue was created via the Job Opportunities Portal application.*
*A collaborator should verify this information and remove the entry for \`${jpId}\` from the \`readme.md\` file.*
`;
        labels = ['delete-job']; // Label as requested
    }

    try {
        const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/issues`, {
            method: 'POST', // Always create a new issue for update/delete requests
            headers: {
                'Authorization': `token ${personalAccessToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                title: issueTitle,
                body: issueBody,
                labels: labels
            })
        });

        if (response.ok) {
            const data = await response.json();
            showModal(`Successfully created GitHub Issue #${data.number} for ${actionType} request: ${data.title}`);
            // Clear form fields after successful creation
            setJpId('');
            setJobLink('');
            setCompanyName('');
            setPositionName('');
            setActionType('edit'); // Reset to default action
        } else {
            const errorData = await response.json();
            showModal(`Error creating ${actionType} issue: ${response.status} - ${errorData.message || 'Unknown error'}. Ensure your token has 'repo' scope and the repository is correct.`);
        }
    } catch (error) {
        showModal(`Network error: ${error.message}. Make sure you are online and GitHub API is reachable.`);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center text-yellow-700 mb-6">Update / Delete Job Opportunity</h2>
      <form onSubmit={handleUpdateDeleteIssue} className="space-y-4">
        <div>
          <label htmlFor="jpId" className="block text-sm font-medium text-gray-700 mb-1">JP ID (e.g., JP123)</label>
          <input
            type="text"
            id="jpId"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
            value={jpId}
            onChange={(e) => setJpId(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Action Type</label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-yellow-600"
                name="actionType"
                value="edit"
                checked={actionType === 'edit'}
                onChange={(e) => setActionType(e.target.value)}
              />
              <span className="ml-2">Edit</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-red-600"
                name="actionType"
                value="delete"
                checked={actionType === 'delete'}
                onChange={(e) => setActionType(e.target.value)}
              />
              <span className="ml-2">Delete</span>
            </label>
          </div>
        </div>

        {actionType === 'edit' && (
          <>
            <div>
              <label htmlFor="positionName" className="block text-sm font-medium text-gray-700 mb-1">New Position Name</label>
              <input
                type="text"
                id="positionName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                value={positionName}
                onChange={(e) => setPositionName(e.target.value)}
                required={actionType === 'edit'}
              />
            </div>
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">New Company Name</label>
              <input
                type="text"
                id="companyName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required={actionType === 'edit'}
              />
            </div>
            <div>
              <label htmlFor="jobLink" className="block text-sm font-medium text-gray-700 mb-1">New Job Link</label>
              <input
                type="url"
                id="jobLink"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                value={jobLink}
                onChange={(e) => setJobLink(e.target.value)}
                required={actionType === 'edit'}
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full px-6 py-3 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? 'Creating Request...' : 'Create GitHub Request Issue'}
        </button>
      </form>

      <button
        onClick={() => navigate('home')}
        className="mt-8 px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-300 w-full"
      >
        Back to Home
      </button>
    </div>
  );
};

export default App; // Export the main App component as default
