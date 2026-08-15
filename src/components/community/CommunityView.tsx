import React, { useState } from 'react';
import { useCareer } from '../../context/CareerContext';
import { CommunityPost, CollabProject } from '../../types';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Plus,
  FolderGit2,
  Send,
  UserCheck,
  Search,
  ExternalLink,
  Sparkles,
  Github,
  CheckCircle2,
} from 'lucide-react';

export const CommunityView: React.FC = () => {
  const {
    communityPosts,
    collabProjects,
    addCommunityPost,
    upvotePost,
    addCommentToPost,
    joinCollabProject,
    userProfile,
    showToast,
  } = useCareer();

  const [activeTab, setActiveTab] = useState<'discussions' | 'collabs'>('discussions');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // New post modal state
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<CommunityPost['category']>('questions');
  const [postTags, setPostTags] = useState('AI/ML, System Design');

  // Comment input state per post
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({});

  // Join Collab modal state
  const [joiningProject, setJoiningProject] = useState<CollabProject | null>(null);
  const [joinRole, setJoinRole] = useState('');
  const [joinMessage, setJoinMessage] = useState('');

  const tagsList = ['All', 'Interview Prep', 'AI/ML', 'System Design', 'Open Source', 'Resume Tips', 'Career Advice'];

  // Helper safe accessor functions for backwards compatibility and object vs string shapes
  const getAuthorName = (author: any): string => {
    if (!author) return 'Community Engineer';
    if (typeof author === 'string') return author;
    return author.name || 'Community Engineer';
  };

  const getAuthorRole = (author: any, fallbackRole?: string): string => {
    if (typeof author === 'object' && author?.role) return author.role;
    return fallbackRole || 'Software Engineer';
  };

  const getAuthorAvatar = (author: any, fallbackAvatar?: string): string => {
    if (typeof author === 'object' && author?.avatar) return author.avatar;
    return fallbackAvatar || '';
  };

  const getAuthorInitial = (author: any): string => {
    const name = getAuthorName(author);
    return name && typeof name === 'string' && name.length > 0 ? name.charAt(0).toUpperCase() : 'U';
  };

  const filteredPosts = communityPosts.filter((p) => {
    const title = (p.title || '').toLowerCase();
    const content = (p.content || '').toLowerCase();
    const authorName = getAuthorName(p.author).toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch = title.includes(query) || content.includes(query) || authorName.includes(query);
    const tags = Array.isArray(p.tags) ? p.tags : [];
    const matchesTag =
      selectedTag === 'All' ||
      tags.some((t) => typeof t === 'string' && t.toLowerCase().includes(selectedTag.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(selectedTag.toLowerCase()));

    return matchesSearch && matchesTag;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) {
      showToast('Please provide both a topic title and content for your post', 'warning');
      return;
    }

    const tagsArray = postTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addCommunityPost(postTitle.trim(), postContent.trim(), postCategory, tagsArray.length > 0 ? tagsArray : ['General']);

    setPostTitle('');
    setPostContent('');
    setIsCreatingPost(false);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    addCommentToPost(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const handleOpenJoinModal = (project: CollabProject) => {
    setJoiningProject(project);
    const availableRoles = project.lookingFor || (project as any).rolesNeeded || ['Software Engineer'];
    setJoinRole(availableRoles[0] || 'Software Engineer');
  };

  const handleJoinProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!joiningProject || !joinRole) {
      showToast('Please select a role to apply for', 'warning');
      return;
    }
    joinCollabProject(joiningProject.id, joinRole);
    setJoiningProject(null);
    setJoinRole('');
    setJoinMessage('');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Title */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Peer Engineering Network
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                12.4k Active Engineers
              </span>
            </div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2.5">
              <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              Community & Open-Source Collab Hub
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Exchange interview insights, get community feedback on resumes, and team up with fellow developers on ambitious portfolio projects.
            </p>
          </div>

          {/* Sub-Tab Navigation */}
          <div className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700/60 shrink-0">
            <button
              onClick={() => setActiveTab('discussions')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'discussions'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Discussions & AMA
            </button>
            <button
              onClick={() => setActiveTab('collabs')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 ${
                activeTab === 'collabs'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <FolderGit2 className="w-4 h-4" /> Open-Source Teams
            </button>
          </div>
        </div>

        {/* TAB 1: DISCUSSIONS */}
        {activeTab === 'discussions' && (
          <div className="space-y-6">
            {/* Filter and Create Toolbar */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4 rounded-2xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search community discussions, AMAs, and interview experiences..."
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsCreatingPost(true)}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 flex items-center gap-1.5 transition-all shrink-0 w-full sm:w-auto justify-center"
                >
                  <Plus className="w-4 h-4" /> Start Discussion
                </button>
              </div>
            </div>

            {/* Tag Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {tagsList.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                    selectedTag === tag
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                      : 'text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 space-y-2">
                  <MessageSquare className="w-8 h-8 text-zinc-400 mx-auto" />
                  <h3 className="font-bold text-sm text-zinc-900 dark:text-white">No discussions found</h3>
                  <p className="text-xs text-zinc-500">Try adjusting your search query or start the conversation!</p>
                </div>
              ) : (
                filteredPosts.map((post) => {
                  const areCommentsOpen = openComments[post.id];
                  const authorName = getAuthorName(post.author);
                  const authorRole = getAuthorRole(post.author, (post as any).authorRole);
                  const authorAvatarUrl = getAuthorAvatar(post.author, (post as any).authorAvatar);
                  const authorInitial = getAuthorInitial(post.author);
                  const postComments = Array.isArray(post.comments) ? post.comments : [];
                  const postTagsList = Array.isArray(post.tags) ? post.tags : [];

                  return (
                    <div
                      key={post.id}
                      className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4 transition-all"
                    >
                      {/* Post Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {authorAvatarUrl && authorAvatarUrl.startsWith('http') ? (
                            <img
                              src={authorAvatarUrl}
                              alt={authorName}
                              className="w-10 h-10 rounded-xl object-cover border border-zinc-200 dark:border-zinc-700"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                              {authorInitial}
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-zinc-900 dark:text-white">
                                {authorName}
                              </span>
                              <span className="text-[11px] text-zinc-500">• {post.createdAt || 'Recent'}</span>
                            </div>
                            <span className="text-[11px] text-zinc-400 block">{authorRole}</span>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 capitalize">
                          {post.category?.replace(/-/g, ' ') || 'Discussion'}
                        </span>
                      </div>

                      {/* Post Content */}
                      <div className="space-y-2">
                        <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                          {post.title}
                        </h3>
                        <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
                          {post.content}
                        </p>
                      </div>

                      {/* Tags */}
                      {postTagsList.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {postTagsList.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2 py-0.5 rounded-md text-[10.5px] bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-mono"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Post Footer Actions */}
                      <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => upvotePost(post.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors font-semibold ${
                              post.userUpvoted
                                ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400'
                                : 'border-zinc-200 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                            }`}
                          >
                            <ThumbsUp className={`w-3.5 h-3.5 ${post.userUpvoted ? 'fill-current' : ''}`} />
                            <span>{post.upvotes} Upvotes</span>
                          </button>

                          <button
                            onClick={() =>
                              setOpenComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))
                            }
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors font-semibold"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-purple-500" />
                            <span>{postComments.length} Comments</span>
                          </button>
                        </div>
                      </div>

                      {/* Collapsible Comments Section */}
                      {areCommentsOpen && (
                        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-4 animate-in fade-in duration-200 text-xs">
                          {/* Existing comments */}
                          <div className="space-y-3">
                            {postComments.length === 0 ? (
                              <p className="text-[11.5px] text-zinc-400 italic">No comments yet. Start the discussion!</p>
                            ) : (
                              postComments.map((comment: any) => {
                                const cAuthorName = getAuthorName(comment.author);
                                const cText = comment.text || comment.content || '';
                                return (
                                  <div
                                    key={comment.id}
                                    className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-800 space-y-1"
                                  >
                                    <div className="flex justify-between items-center text-[11px]">
                                      <span className="font-bold text-zinc-900 dark:text-white">
                                        {cAuthorName}
                                      </span>
                                      <span className="text-zinc-400">{comment.createdAt || 'Recent'}</span>
                                    </div>
                                    <p className="text-zinc-700 dark:text-zinc-300 leading-normal">
                                      {cText}
                                    </p>
                                  </div>
                                );
                              })
                            )}
                          </div>

                          {/* Add Comment Input */}
                          <div className="flex items-center gap-2 pt-2">
                            <input
                              type="text"
                              value={commentInputs[post.id] || ''}
                              onChange={(e) =>
                                setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                              }
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAddComment(post.id);
                              }}
                              placeholder="Write a constructive engineering reply..."
                              className="flex-1 px-3 py-2 text-xs rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                              onClick={() => handleAddComment(post.id)}
                              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-transform active:scale-95"
                              title="Send Reply"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 2: COLLABORATION PROJECTS */}
        {activeTab === 'collabs' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {collabProjects.map((project: any) => {
                const teamSize = project.teamSize || `${project.membersCount || 2} engineers`;
                const openRolesCount = project.openRoles !== undefined ? project.openRoles : 2;
                const projectTags = project.tags || project.techStack || [];
                const lookingForRoles = project.lookingFor || project.rolesNeeded || ['Software Engineer'];
                const ownerName = project.owner?.name || project.leadName || 'Maintainer';

                return (
                  <div
                    key={project.id}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                              {teamSize} • {openRolesCount} Openings
                            </span>
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                title="View Repository"
                              >
                                <Github className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                          <h3 className="text-base font-bold text-zinc-900 dark:text-white mt-2">
                            {project.title}
                          </h3>
                          {project.tagline && (
                            <p className="text-[11px] font-medium text-indigo-600 dark:text-indigo-400 mt-0.5">
                              {project.tagline}
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">Technologies:</span>
                        <div className="flex flex-wrap gap-1">
                          {projectTags.map((tech: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded text-[10.5px] bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Needed Roles */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase">Open Positions:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {lookingForRoles.map((role: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20"
                            >
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                      <div className="text-xs text-zinc-500">
                        Lead: <span className="font-bold text-zinc-700 dark:text-zinc-300">{ownerName}</span>
                      </div>

                      <button
                        onClick={() => handleOpenJoinModal(project)}
                        className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 flex items-center gap-1.5 transition-all"
                      >
                        <UserCheck className="w-3.5 h-3.5" /> Apply to Join Team
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* CREATE POST MODAL */}
      {isCreatingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-xl rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              Create Community Discussion
            </h3>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Topic Title
                </label>
                <input
                  type="text"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g. Best practices for RAG chunking strategies in production?"
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Category
                  </label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs"
                  >
                    <option value="questions">Question / AMA</option>
                    <option value="interview-experiences">Interview Experience</option>
                    <option value="project-showcase">Project Showcase</option>
                    <option value="career-advice">Career Advice</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={postTags}
                    onChange={(e) => setPostTags(e.target.value)}
                    placeholder="AI/ML, Vector DB, Resume"
                    className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Detailed Discussion Content
                </label>
                <textarea
                  rows={6}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Share context, your current approach, and what specific advice or collaboration you are seeking..."
                  className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreatingPost(false)}
                  className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* JOIN PROJECT MODAL */}
      {joiningProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4">
            <h3 className="font-bold text-base text-zinc-900 dark:text-white">
              Apply to Join: {joiningProject.title}
            </h3>

            <form onSubmit={handleJoinProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Select Role
                </label>
                <select
                  value={joinRole}
                  onChange={(e) => setJoinRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs"
                >
                  {(joiningProject.lookingFor || (joiningProject as any).rolesNeeded || ['Software Engineer']).map(
                    (r: string, idx: number) => (
                      <option key={idx} value={r}>
                        {r}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Brief Introduction & Portfolio Link
                </label>
                <textarea
                  rows={4}
                  value={joinMessage}
                  onChange={(e) => setJoinMessage(e.target.value)}
                  placeholder="Hey team, I'd love to contribute to this project. Check out my GitHub or experience in..."
                  className="w-full p-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setJoiningProject(null)}
                  className="px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
