import { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:8000/api/v1";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: "📊" },
  { id: "upload", label: "Upload", icon: "📤" },
  { id: "chat", label: "Chat", icon: "💬" },
  { id: "papers", label: "Library", icon: "📚" },
  { id: "compare", label: "Compare", icon: "🔎" },
  { id: "notes", label: "Notes", icon: "📝" },
];

function Card({ title, value, accent }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50">
      <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">
        {title}
      </p>
      <p className={`mt-4 text-3xl font-semibold ${accent}`}>{value}</p>
    </div>
  );
}

function Sidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="hidden min-h-screen w-80 flex-col border-r border-slate-200 bg-slate-50 p-8 xl:flex">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">
          Research Assistant
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950">ResearchFlow</h1>
        <p className="mt-3 max-w-[260px] text-sm leading-6 text-slate-500">
          Upload papers, chat with them, compare findings, and generate study
          summaries from your local machine.
        </p>
      </div>
      <div className="space-y-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex w-full items-center gap-3 rounded-3xl px-5 py-4 text-left text-slate-700 transition ${
              activeTab === tab.id
                ? "bg-cyan-500/10 text-cyan-700 shadow-sm shadow-cyan-200"
                : "hover:bg-slate-100"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-auto rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
          Local First
        </p>
        <p className="mt-3 text-sm text-slate-600">
          No cloud access required. Ollama + FAISS run on your machine.
        </p>
      </div>
    </aside>
  );
}

function HeroCard({ papersCount, chunksCount }) {
  return (
    <section className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-100 to-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-700">
            Local AI Research Copilot
          </p>
          <h2 className="mt-4 text-4xl font-bold text-slate-950">
            ResearchFlow — Intelligent paper analysis
          </h2>
          <p className="mt-4 max-w-2xl text-slate-600">
            Upload PDFs, index them locally, and ask your research assistant
            questions with citation-aware answers and notes generation.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">Papers in library</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {papersCount}
            </p>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500">Indexed chunks</p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {chunksCount}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dashboard({ papers }) {
  const totalChunks = papers.reduce(
    (sum, paper) => sum + (paper.chunks || 0),
    0,
  );

  return (
    <div className="space-y-8">
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">Overview</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-950">
                  Research pipeline
                </h3>
              </div>
              <span className="rounded-3xl bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-700">
                Live
              </span>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <Card
                title="Uploaded Papers"
                value={papers.length}
                accent="text-slate-950"
              />
              <Card
                title="Indexed Chunks"
                value={totalChunks}
                accent="text-slate-950"
              />
              <Card
                title="Ready Status"
                value={papers.length ? "Active" : "Pending"}
                accent="text-cyan-700"
              />
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-950">
              What ResearchFlow offers
            </h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Multi-document retrieval",
                "Citation-aware answers",
                "Paper breakdown cards",
                "Compare findings side-by-side",
                "Auto notes & flashcards",
                "Local Ollama model support",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-sm font-medium text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-950">
              Action cards
            </h3>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">
                  Upload new paper
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Add processed research papers for retrieval and summary.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">
                  Chat with documents
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Ask questions and get grounded answers with source citations.
                </p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-slate-900">
                  Generate notes
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Create bullet notes, flashcards, and exam-style questions
                  instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Upload({ files, setFiles, loading, onUpload }) {
  const handleFileChange = (event) =>
    setFiles(Array.from(event.target.files || []));

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-semibold text-slate-950">Upload Papers</h2>
        <p className="mt-3 text-slate-600">
          Drag PDFs into the uploader to create a local research library for RAG
          and citation search.
        </p>
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <label className="group relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center transition hover:border-cyan-400 hover:bg-cyan-50">
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFileChange}
              className="sr-only"
            />
            <div className="text-5xl">📄</div>
            <p className="mt-4 text-xl font-semibold text-slate-900">
              Drop PDFs here
            </p>
            <p className="mt-2 text-sm text-slate-500">
              or browse your computer
            </p>
          </label>
          <div className="space-y-4 rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Selected files
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-950">
                  {files.length}
                </p>
              </div>
              <button
                onClick={onUpload}
                disabled={loading || files.length === 0}
                className="rounded-3xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Indexing..." : "Upload files"}
              </button>
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto rounded-3xl border border-slate-200 bg-slate-50 p-4">
              {files.length === 0 ? (
                <p className="text-sm text-slate-500">No files selected yet.</p>
              ) : (
                files.map((file) => (
                  <div
                    key={file.name}
                    className="rounded-3xl bg-white p-3 shadow-sm"
                  >
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Chat({
  loading,
  question,
  setQuestion,
  explainLikeFive,
  setExplainLikeFive,
  onAsk,
  chatResponse,
}) {
  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-slate-950">
              Chat & RAG
            </h2>
            <p className="mt-2 text-slate-600">
              Ask questions and receive grounded answers with references from
              your uploaded papers.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-cyan-800">
            Explain like I’m 5
          </span>
        </div>
        <div className="mt-8 space-y-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows="5"
            className="w-full rounded-[28px] border border-slate-200 bg-slate-50 p-5 text-slate-900 outline-none transition focus:border-cyan-400"
            placeholder="Type a research question based on your uploaded documents"
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-3 rounded-[28px] border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <input
                type="checkbox"
                checked={explainLikeFive}
                onChange={(e) => setExplainLikeFive(e.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-cyan-600"
              />
              <span className="text-sm text-slate-700">
                Explain in simple language
              </span>
            </label>
            <button
              onClick={onAsk}
              disabled={loading || !question.trim()}
              className="rounded-3xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Generating answer..." : "Ask ResearchFlow"}
            </button>
          </div>
        </div>
      </div>

      {chatResponse && (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <h3 className="text-2xl font-semibold text-slate-950">Answer</h3>
            <p className="mt-4 whitespace-pre-wrap text-slate-700 leading-7">
              {chatResponse.answer}
            </p>
          </div>
          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-7 shadow-sm">
            <h3 className="text-xl font-semibold text-slate-950">Citations</h3>
            <div className="mt-5 space-y-4">
              {chatResponse.citations.length === 0 ? (
                <p className="text-sm text-slate-500">
                  No citations found for this answer.
                </p>
              ) : (
                chatResponse.citations.map((citation, index) => (
                  <div
                    key={index}
                    className="rounded-3xl border border-slate-200 bg-white p-4"
                  >
                    <p className="text-sm font-semibold text-slate-900">
                      {formatPaperName(citation.file_name)}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      Page {citation.page_number}
                    </p>
                    <p className="mt-2 text-sm text-slate-700">
                      {citation.snippet}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Library({ papers, selectedPaper, setSelectedPaper }) {
  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-semibold text-slate-950">My Papers</h2>
        <p className="mt-3 text-slate-600">
          Browse the documents that have been uploaded and indexed.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {papers.length === 0 ? (
          <div className="col-span-full rounded-[32px] border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
            No papers indexed yet. Upload PDFs to populate the library.
          </div>
        ) : (
          papers.map((paper) => (
            <button
              key={paper.paper_id}
              onClick={() => setSelectedPaper(paper)}
              className={`rounded-[28px] border p-6 text-left transition ${
                selectedPaper?.paper_id === paper.paper_id
                  ? "border-cyan-500 bg-cyan-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-xl">📄</p>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-600">
                  Paper
                </span>
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-950">
                {formatPaperName(paper.file_name)}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-500">
                <span>{paper.pages} pages</span>
                <span>{paper.chunks} chunks</span>
              </div>
            </button>
          ))
        )}
      </div>
      {selectedPaper && (
        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <h3 className="text-2xl font-semibold text-slate-950">
            Selected paper details
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white p-5 border border-slate-200">
              <p className="text-sm text-slate-500">File name</p>
              <p className="mt-2 font-medium text-slate-900">
                {formatPaperName(selectedPaper.file_name)}
              </p>
            </div>
            <div className="rounded-3xl bg-white p-5 border border-slate-200">
              <p className="text-sm text-slate-500">Pages</p>
              <p className="mt-2 font-medium text-slate-900">
                {selectedPaper.pages}
              </p>
            </div>
            <div className="rounded-3xl bg-white p-5 border border-slate-200">
              <p className="text-sm text-slate-500">Chunks</p>
              <p className="mt-2 font-medium text-slate-900">
                {selectedPaper.chunks}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Compare({
  papers,
  selectedForComparison,
  setSelectedForComparison,
  loading,
  onCompare,
  compareResult,
}) {
  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-semibold text-slate-950">
          Compare Papers
        </h2>
        <p className="mt-3 text-slate-600">
          Select two or more papers and ask ResearchFlow to compare methodology,
          datasets, and conclusions.
        </p>
      </div>
      <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
        <h3 className="text-xl font-semibold text-slate-950">Paper selector</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {papers.map((paper) => (
            <button
              key={paper.paper_id}
              onClick={() =>
                setSelectedForComparison((prev) =>
                  prev.includes(paper.paper_id)
                    ? prev.filter((id) => id !== paper.paper_id)
                    : [...prev, paper.paper_id],
                )
              }
              className={`rounded-3xl border p-5 text-left transition ${
                selectedForComparison.includes(paper.paper_id)
                  ? "border-cyan-500 bg-cyan-50 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <h4 className="font-semibold text-slate-950">
                {formatPaperName(paper.file_name)}
              </h4>
              <p className="mt-2 text-sm text-slate-500">
                Chunks: {paper.chunks}
              </p>
            </button>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Selected papers: {selectedForComparison.length}
          </p>
          <button
            onClick={onCompare}
            disabled={loading || selectedForComparison.length < 2}
            className="rounded-3xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Comparing..." : "Compare selected papers"}
          </button>
        </div>
      </div>
      {compareResult && (
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <h3 className="text-2xl font-semibold text-slate-950">
            Comparison result
          </h3>
          <p className="mt-4 whitespace-pre-wrap text-slate-700">
            {compareResult}
          </p>
        </div>
      )}
    </div>
  );
}

function Notes({ papers, loading, onGenerateNotes, notesResult, ideasResult }) {
  const [mode, setMode] = useState("bullet");

  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-semibold text-slate-950">Notes & Ideas</h2>
        <p className="mt-3 text-slate-600">
          Generate learning materials and research directions from your paper
          library.
        </p>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-950">Note mode</h3>
          <div className="mt-5 space-y-4">
            {["bullet", "flashcards", "questions", "definitions"].map(
              (option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-4"
                >
                  <input
                    type="radio"
                    name="mode"
                    value={option}
                    checked={mode === option}
                    onChange={(e) => setMode(e.target.value)}
                    className="h-4 w-4 text-cyan-600"
                  />
                  <span className="text-sm font-medium text-slate-700 capitalize">
                    {option}
                  </span>
                </label>
              ),
            )}
          </div>
          <button
            onClick={() => onGenerateNotes(mode)}
            disabled={loading || papers.length === 0}
            className="mt-6 w-full rounded-3xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Generating..." : `Generate ${mode}`}
          </button>
          <button
            onClick={() => onGenerateNotes("ideas")}
            disabled={loading || papers.length === 0}
            className="mt-4 w-full rounded-3xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Research Ideas"}
          </button>
        </div>
        <div className="space-y-6">
          {notesResult && (
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">
                Notes output
              </h3>
              <p className="mt-4 whitespace-pre-wrap text-slate-700">
                {notesResult}
              </p>
            </div>
          )}
          {ideasResult && (
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-950">
                Research ideas
              </h3>
              <p className="mt-4 whitespace-pre-wrap text-slate-700">
                {ideasResult}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [files, setFiles] = useState([]);
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedForComparison, setSelectedForComparison] = useState([]);
  const [question, setQuestion] = useState("");
  const [chatResponse, setChatResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [explainLikeFive, setExplainLikeFive] = useState(false);
  const [compareResult, setCompareResult] = useState("");
  const [notesResult, setNotesResult] = useState("");
  const [ideasResult, setIdeasResult] = useState("");

  useEffect(() => {
    refreshPapers();
  }, []);

  const refreshPapers = async () => {
    try {
      const response = await fetch(`${API_BASE}/papers`);
      const data = await response.json();
      setPapers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setPapers([]);
    }
  };

  const uploadPapers = async () => {
    if (!files.length) return;
    setLoading(true);
    setCompareResult("");
    setNotesResult("");
    setIdeasResult("");
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        setFiles([]);
        await refreshPapers();
        setActiveTab("papers");
      } else {
        const error = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setCompareResult("");
    setNotesResult("");
    setIdeasResult("");
    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          explain_like_im_five: explainLikeFive,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setChatResponse(data);
      } else {
        const error = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const comparePapers = async () => {
    if (selectedForComparison.length < 2) return;
    setLoading(true);
    setCompareResult("");
    try {
      const response = await fetch(`${API_BASE}/compare`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paper_ids: selectedForComparison }),
      });
      if (response.ok) {
        const data = await response.json();
        setCompareResult(data.comparison || "");
      } else {
        const error = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const generateNotes = async (mode) => {
    setLoading(true);
    setNotesResult("");
    setIdeasResult("");
    const endpoint = mode === "ideas" ? "/ideas" : "/notes";
    const payload =
      mode === "ideas"
        ? { paper_ids: papers.map((paper) => paper.paper_id) }
        : { paper_ids: papers.map((paper) => paper.paper_id), mode };

    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        if (mode === "ideas") {
          setIdeasResult(data.ideas || "");
        } else {
          setNotesResult(data.notes || "");
        }
      } else {
        const error = await response.json();
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1">
          <div className="border-b border-slate-200 bg-white px-6 py-5 shadow-sm xl:hidden">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
                  ResearchFlow
                </p>
                <p className="text-xl font-semibold text-slate-950">
                  Local research copilot
                </p>
              </div>
              <div className="inline-flex items-center gap-3 text-sm text-slate-600">
                <span>v0.1.0</span>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    activeTab === tab.id
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-700"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <main className="space-y-8 px-6 py-8 xl:px-10">
            <HeroCard
              papersCount={papers.length}
              chunksCount={papers.reduce(
                (sum, paper) => sum + (paper.chunks || 0),
                0,
              )}
            />
            {activeTab === "dashboard" && <Dashboard papers={papers} />}
            {activeTab === "upload" && (
              <Upload
                files={files}
                setFiles={setFiles}
                loading={loading}
                onUpload={uploadPapers}
              />
            )}
            {activeTab === "chat" && (
              <Chat
                loading={loading}
                question={question}
                setQuestion={setQuestion}
                explainLikeFive={explainLikeFive}
                setExplainLikeFive={setExplainLikeFive}
                onAsk={askQuestion}
                chatResponse={chatResponse}
              />
            )}
            {activeTab === "papers" && (
              <Library
                papers={papers}
                selectedPaper={selectedPaper}
                setSelectedPaper={setSelectedPaper}
              />
            )}
            {activeTab === "compare" && (
              <Compare
                papers={papers}
                selectedForComparison={selectedForComparison}
                setSelectedForComparison={setSelectedForComparison}
                loading={loading}
                onCompare={comparePapers}
                compareResult={compareResult}
              />
            )}
            {activeTab === "notes" && (
              <Notes
                papers={papers}
                loading={loading}
                onGenerateNotes={generateNotes}
                notesResult={notesResult}
                ideasResult={ideasResult}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
