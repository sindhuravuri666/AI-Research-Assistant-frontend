import { useEffect, useState } from "react";

const API_BASE = "http://127.0.0.1:8000/api/v1";

const sectionClass =
  "rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-soft";

function formatPaperName(name) {
  return name.replace(/_/g, " ");
}

function App() {
  const [files, setFiles] = useState([]);
  const [papers, setPapers] = useState([]);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [question, setQuestion] = useState("");
  const [chatResponse, setChatResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Ready to power your research.");
  const [explainLikeFive, setExplainLikeFive] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/papers`)
      .then((res) => res.json())
      .then((data) => setPapers(data))
      .catch(() => setPapers([]));
  }, []);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files || []));
  };

  const uploadPapers = async () => {
    if (!files.length) {
      setMessage("Please select one or more PDFs to upload.");
      return;
    }
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    setLoading(true);
    setMessage("Uploading and processing PDFs...");
    try {
      const response = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Upload failed");
      }
      await refreshPapers();
      setMessage("Upload complete. Your papers are ready for chat.");
      setFiles([]);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshPapers = async () => {
    const response = await fetch(`${API_BASE}/papers`);
    const data = await response.json();
    setPapers(data);
  };

  const askQuestion = async () => {
    if (!question.trim()) {
      setMessage("Type a question to get started.");
      return;
    }
    setLoading(true);
    setMessage("Retrieving documents and generating answer...");
    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          explain_like_im_five: explainLikeFive,
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Chat request failed");
      }
      const data = await response.json();
      setChatResponse(data);
      setMessage("Answer generated successfully.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">
              Local Research Assistant
            </p>
            <h1 className="mt-3 text-4xl font-semibold text-white">
              Research copilot for your PDFs
            </h1>
            <p className="mt-3 max-w-2xl text-slate-400">
              Upload papers, chat with them, compare findings, and generate
              study notes without leaving your machine.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-flow-col sm:auto-cols-max">
            <button
              onClick={refreshPapers}
              className="rounded-2xl bg-slate-800 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              Refresh Papers
            </button>
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[0.9fr_0.7fr]">
          <section className={sectionClass}>
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold">
                  Upload research papers
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  Add multiple PDFs and let the assistant parse them page by
                  page.
                </p>
              </div>
            </div>
            <div className="grid gap-4">
              <label className="flex min-h-[120px] flex-col items-center justify-center rounded-3xl border border-dashed border-slate-700 bg-slate-900/70 p-6 text-center text-slate-400 transition hover:border-cyan-300/60 hover:text-white">
                <span className="text-sm font-medium">
                  Drop PDFs here or click to browse
                </span>
                <input
                  type="file"
                  accept="application/pdf"
                  multiple
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>
              {files.length > 0 && (
                <div className="space-y-2 rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                  <p className="text-sm text-slate-300">Selected files:</p>
                  <ul className="space-y-1 text-sm text-slate-200">
                    {files.map((file) => (
                      <li key={file.name}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                onClick={uploadPapers}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Upload PDFs
              </button>
            </div>
          </section>

          <section className={sectionClass}>
            <h2 className="text-2xl font-semibold">Uploaded papers</h2>
            <p className="mt-2 text-sm text-slate-400">
              Your local document library is available here.
            </p>
            <div className="mt-6 space-y-3">
              {papers.length === 0 ? (
                <div className="rounded-3xl bg-slate-900/70 p-4 text-sm text-slate-400">
                  No papers uploaded yet.
                </div>
              ) : (
                papers.map((paper) => (
                  <button
                    key={paper.paper_id}
                    onClick={() => setSelectedPaper(paper)}
                    className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 p-4 text-left transition hover:border-cyan-400/70"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">
                          {formatPaperName(paper.file_name)}
                        </p>
                        <p className="mt-1 text-sm text-slate-400">
                          Pages: {paper.pages} • Chunks: {paper.chunks}
                        </p>
                      </div>
                      {selectedPaper?.paper_id === paper.paper_id && (
                        <span className="rounded-full bg-cyan-500 px-3 py-1 text-xs font-semibold text-slate-950">
                          Selected
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </section>
        </div>

        <section className={`${sectionClass} mt-6`}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">
                Chat with your research
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Ask questions about uploaded papers and receive citation-aware
                answers.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={explainLikeFive}
                  onChange={(event) => setExplainLikeFive(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-cyan-500"
                />
                Explain like I’m 5
              </label>
            </div>
          </div>
          <div className="mt-6 grid gap-4">
            <textarea
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              rows="5"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-100 outline-none transition focus:border-cyan-400"
              placeholder="Ask your research assistant anything about the uploaded documents..."
            />
            <button
              onClick={askQuestion}
              disabled={loading}
              className="w-full rounded-3xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Generate answer
            </button>
          </div>
          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm text-slate-400">Status: {message}</p>
            {chatResponse && (
              <div className="mt-5 space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-white">Answer</h3>
                  <p className="mt-3 whitespace-pre-wrap text-slate-200">
                    {chatResponse.answer}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Citations
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {chatResponse.citations.map((citation, index) => (
                      <li
                        key={index}
                        className="rounded-2xl border border-slate-700 bg-slate-950/80 p-4"
                      >
                        <p className="font-semibold text-white">
                          {formatPaperName(citation.file_name)} • Page{" "}
                          {citation.page_number}
                        </p>
                        <p className="mt-2 text-slate-300">
                          {citation.snippet}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
