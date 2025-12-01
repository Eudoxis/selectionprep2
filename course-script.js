// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// Module Expand/Collapse
document.querySelectorAll('.module-header').forEach(header => {
    header.addEventListener('click', () => {
        const module = header.parentElement;
        const lessonsList = module.querySelector('.lessons-list');
        const isActive = module.classList.contains('active');

        // Toggle current module
        if (isActive) {
            module.classList.remove('active');
            lessonsList.style.display = 'none';
        } else {
            module.classList.add('active');
            lessonsList.style.display = 'block';
        }
    });
});

// Collapse All Modules
const collapseAllBtn = document.getElementById('collapseAll');
let allCollapsed = false;

collapseAllBtn.addEventListener('click', () => {
    const modules = document.querySelectorAll('.module-item');

    if (allCollapsed) {
        // Expand all
        modules.forEach(module => {
            module.classList.add('active');
            const lessonsList = module.querySelector('.lessons-list');
            if (lessonsList) {
                lessonsList.style.display = 'block';
            }
        });
        collapseAllBtn.textContent = 'Collapse All';
        allCollapsed = false;
    } else {
        // Collapse all
        modules.forEach(module => {
            module.classList.remove('active');
            const lessonsList = module.querySelector('.lessons-list');
            if (lessonsList) {
                lessonsList.style.display = 'none';
            }
        });
        collapseAllBtn.textContent = 'Expand All';
        allCollapsed = true;
    }
});

// Search Lessons
const searchInput = document.getElementById('searchLessons');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const lessons = document.querySelectorAll('.lesson-item');

    lessons.forEach(lesson => {
        const lessonTitle = lesson.querySelector('.lesson-title').textContent.toLowerCase();
        const module = lesson.closest('.module-item');

        if (lessonTitle.includes(searchTerm)) {
            lesson.style.display = 'flex';
            // Expand module if search matches
            if (searchTerm) {
                module.classList.add('active');
                module.querySelector('.lessons-list').style.display = 'block';
            }
        } else {
            if (searchTerm) {
                lesson.style.display = 'none';
            } else {
                lesson.style.display = 'flex';
            }
        }
    });
});

// Lesson Navigation
document.querySelectorAll('.lesson-item').forEach((lesson, index) => {
    lesson.addEventListener('click', () => {
        // Remove active class from all lessons
        document.querySelectorAll('.lesson-item').forEach(l => l.classList.remove('active'));

        // Add active class to clicked lesson
        lesson.classList.add('active');

        // Scroll to top of main content
        document.querySelector('.main-content').scrollTop = 0;

        // In a real app, this would load the lesson content
        console.log('Lesson clicked:', lesson.querySelector('.lesson-title').textContent);
    });
});

// Tab Navigation
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');

        // Remove active class from all tabs and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Video Player Controls (Simple simulation)
const playButton = document.querySelector('.play-button');
const videoPlayer = document.querySelector('.video-player');
const controlPlayBtn = document.querySelector('.video-controls .control-btn');

if (playButton) {
    playButton.addEventListener('click', () => {
        playButton.textContent = '⏸';
        console.log('Video playing...');

        // Simulate video playing
        setTimeout(() => {
            playButton.textContent = '▶';
        }, 3000);
    });
}

if (controlPlayBtn) {
    controlPlayBtn.addEventListener('click', () => {
        if (controlPlayBtn.textContent === '▶') {
            controlPlayBtn.textContent = '⏸';
        } else {
            controlPlayBtn.textContent = '▶';
        }
    });
}

// Progress Bar Click
const progressBar = document.querySelector('.progress-bar');
if (progressBar) {
    progressBar.addEventListener('click', (e) => {
        const rect = progressBar.getBoundingClientRect();
        const percent = ((e.clientX - rect.left) / rect.width) * 100;
        const progressFilled = progressBar.querySelector('.progress-filled');
        progressFilled.style.width = percent + '%';

        // Update time display
        const totalSeconds = 22 * 60 + 15; // 22:15 in seconds
        const currentSeconds = Math.floor((totalSeconds * percent) / 100);
        const minutes = Math.floor(currentSeconds / 60);
        const seconds = currentSeconds % 60;
        const timeDisplay = document.querySelector('.time-display');
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')} / 22:15`;
    });
}

// Speed Control
const speedBtns = document.querySelectorAll('.video-options .control-btn');
if (speedBtns.length > 0) {
    speedBtns[0].addEventListener('click', () => {
        const currentSpeed = parseFloat(speedBtns[0].textContent);
        const speeds = [0.5, 0.75, 1, 1.25, 1.5, 2];
        const currentIndex = speeds.indexOf(currentSpeed);
        const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
        speedBtns[0].textContent = nextSpeed + 'x';
    });
}

// Copy Code Button
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const codeBlock = btn.closest('.code-example').querySelector('code');
        const code = codeBlock.textContent;

        navigator.clipboard.writeText(code).then(() => {
            const originalText = btn.textContent;
            btn.textContent = 'Copied!';
            btn.style.background = '#10b981';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            alert('Copy to clipboard not supported in this browser');
        });
    });
});

// Mark as Complete Button
const completeBtn = document.querySelector('.btn-complete');
if (completeBtn) {
    completeBtn.addEventListener('click', () => {
        const currentLesson = document.querySelector('.lesson-item.active');

        if (currentLesson) {
            currentLesson.classList.add('completed');
            currentLesson.querySelector('.lesson-icon').textContent = '✓';

            // Update progress
            updateProgress();

            // Show success message
            showNotification('Lesson marked as complete! 🎉');

            // Auto-navigate to next lesson after a delay
            setTimeout(() => {
                const nextLesson = getNextLesson(currentLesson);
                if (nextLesson) {
                    nextLesson.click();
                }
            }, 1000);
        }
    });
}

// Navigation Buttons
const prevBtn = document.querySelector('.nav-btn.prev');
const nextBtn = document.querySelector('.nav-btn.next');

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        const currentLesson = document.querySelector('.lesson-item.active');
        const prevLesson = getPreviousLesson(currentLesson);
        if (prevLesson) {
            prevLesson.click();
        }
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        const currentLesson = document.querySelector('.lesson-item.active');
        const nextLesson = getNextLesson(currentLesson);
        if (nextLesson) {
            nextLesson.click();
        }
    });
}

// Helper Functions
function getNextLesson(currentLesson) {
    if (!currentLesson) return null;

    const allLessons = Array.from(document.querySelectorAll('.lesson-item'));
    const currentIndex = allLessons.indexOf(currentLesson);

    if (currentIndex < allLessons.length - 1) {
        return allLessons[currentIndex + 1];
    }

    return null;
}

function getPreviousLesson(currentLesson) {
    if (!currentLesson) return null;

    const allLessons = Array.from(document.querySelectorAll('.lesson-item'));
    const currentIndex = allLessons.indexOf(currentLesson);

    if (currentIndex > 0) {
        return allLessons[currentIndex - 1];
    }

    return null;
}

function updateProgress() {
    const allLessons = document.querySelectorAll('.lesson-item:not(.quiz):not(.assignment)');
    const completedLessons = document.querySelectorAll('.lesson-item.completed:not(.quiz):not(.assignment)');

    const progress = Math.round((completedLessons.length / allLessons.length) * 100);

    // Update top progress bar
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text strong');

    if (progressFill && progressText) {
        progressFill.style.width = progress + '%';
        progressText.textContent = progress + '%';
    }

    // Update module progress
    document.querySelectorAll('.module-item').forEach(module => {
        const moduleLessons = module.querySelectorAll('.lesson-item:not(.quiz):not(.assignment)');
        const moduleCompleted = module.querySelectorAll('.lesson-item.completed:not(.quiz):not(.assignment)');
        const moduleProgress = module.querySelector('.module-progress');

        if (moduleProgress) {
            moduleProgress.textContent = `${moduleCompleted.length}/${moduleLessons.length}`;
        }
    });
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Notes Auto-save
const notesTextarea = document.querySelector('.note-editor textarea');
if (notesTextarea) {
    let saveTimeout;

    notesTextarea.addEventListener('input', () => {
        clearTimeout(saveTimeout);

        saveTimeout = setTimeout(() => {
            // In a real app, this would save to a backend
            console.log('Notes auto-saved');
            showNotification('Notes saved 💾');
        }, 2000);
    });
}

// Save Notes Button
const saveNotesBtn = document.querySelector('.note-actions .btn-primary');
if (saveNotesBtn) {
    saveNotesBtn.addEventListener('click', () => {
        showNotification('Notes saved successfully! 💾');
    });
}

// Comment System
const postCommentBtn = document.querySelector('.new-comment .btn-primary');
if (postCommentBtn) {
    postCommentBtn.addEventListener('click', () => {
        const textarea = document.querySelector('.new-comment textarea');
        const commentText = textarea.value.trim();

        if (commentText) {
            // In a real app, this would post to a backend
            showNotification('Comment posted! 💬');
            textarea.value = '';
        }
    });
}

// Comment Actions (Like, Reply)
document.querySelectorAll('.comment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.textContent.includes('👍')) {
            const currentCount = parseInt(btn.textContent.match(/\d+/)[0]);
            btn.textContent = `👍 ${currentCount + 1}`;
        } else if (btn.textContent === 'Reply') {
            showNotification('Reply feature coming soon! 💬');
        }
    });
});

// Download Resources
document.querySelectorAll('.btn-download').forEach(btn => {
    btn.addEventListener('click', () => {
        const resourceName = btn.closest('.resource-item').querySelector('strong').textContent;
        showNotification(`Downloading: ${resourceName} 📥`);
    });
});

// External Links
document.querySelectorAll('.btn-link').forEach(btn => {
    btn.addEventListener('click', () => {
        const linkName = btn.closest('.resource-item').querySelector('strong').textContent;
        showNotification(`Opening: ${linkName} 🌐`);
    });
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Space to play/pause
    if (e.code === 'Space' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        if (controlPlayBtn) {
            controlPlayBtn.click();
        }
    }

    // Arrow keys for navigation
    if (e.code === 'ArrowLeft' && !e.target.closest('textarea, input')) {
        // Seek backward 5 seconds
        console.log('Seek backward');
    }

    if (e.code === 'ArrowRight' && !e.target.closest('textarea, input')) {
        // Seek forward 5 seconds
        console.log('Seek forward');
    }

    // N for next lesson
    if (e.code === 'KeyN' && !e.target.closest('textarea, input')) {
        if (nextBtn) nextBtn.click();
    }

    // P for previous lesson
    if (e.code === 'KeyP' && !e.target.closest('textarea, input')) {
        if (prevBtn) prevBtn.click();
    }

    // M to mark as complete
    if (e.code === 'KeyM' && !e.target.closest('textarea, input')) {
        if (completeBtn) completeBtn.click();
    }
});

// Transcript Click to Seek
document.querySelectorAll('.transcript-item').forEach(item => {
    item.addEventListener('click', () => {
        const timestamp = item.querySelector('.timestamp').textContent;
        showNotification(`Seeking to ${timestamp} ⏱`);

        // In a real app, this would seek the video
        console.log('Seek to:', timestamp);
    });
});

// User Menu Click
const userMenu = document.querySelector('.user-menu');
if (userMenu) {
    userMenu.addEventListener('click', () => {
        showNotification('User menu coming soon! 👤');
    });
}

// Notification Icon
const notificationIcon = document.querySelector('.btn-icon');
if (notificationIcon) {
    notificationIcon.addEventListener('click', () => {
        showNotification('You have 3 new notifications 🔔');
    });
}

// View All Resources
const viewResourcesBtn = document.querySelector('.sidebar-footer .btn-secondary');
if (viewResourcesBtn) {
    viewResourcesBtn.addEventListener('click', () => {
        // Switch to resources tab
        const resourcesTab = document.querySelector('[data-tab="resources"]');
        if (resourcesTab) {
            resourcesTab.click();
        }
    });
}

// Initialize on page load
window.addEventListener('load', () => {
    console.log('Course page loaded successfully!');

    // Calculate initial progress
    updateProgress();

    // Auto-expand first module
    const firstModule = document.querySelector('.module-item');
    if (firstModule && firstModule.classList.contains('active')) {
        const lessonsList = firstModule.querySelector('.lessons-list');
        if (lessonsList) {
            lessonsList.style.display = 'block';
        }
    }
});

// Track time spent on lesson (for analytics)
let lessonStartTime = Date.now();
let totalTimeSpent = 0;

setInterval(() => {
    totalTimeSpent += 1;
    // In a real app, periodically send this to analytics
    if (totalTimeSpent % 60 === 0) {
        console.log(`Time spent on lesson: ${totalTimeSpent / 60} minutes`);
    }
}, 1000);

// Save progress before leaving
window.addEventListener('beforeunload', () => {
    // In a real app, save progress to backend
    console.log('Saving progress before leaving...');
});

// Console Easter Egg
console.log('%c🎓 Course Platform', 'font-size: 24px; color: #6366f1; font-weight: bold;');
console.log('%cKeyboard Shortcuts:', 'font-size: 16px; color: #10b981; font-weight: bold;');
console.log('Space: Play/Pause');
console.log('N: Next Lesson');
console.log('P: Previous Lesson');
console.log('M: Mark as Complete');
console.log('Arrow Keys: Seek video');
