
"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Atom, BookOpen, Calculator, ChevronRight, ChevronLeft, Dumbbell,
  Flower2, Guitar, Languages, Mic, Microscope, MapPin, Monitor,
  ChevronDown, Search, Clock, X, Loader2, Book, Tractor, BookUser,
  Palette, SquareCode, LaptopMinimal, Beaker, Handshake, Brain, Speaker,
  Drama, Vote, TentTree, BookOpenText, Vegan, ScrollText, LibraryBig,
  FlaskConical, Landmark, Code2, Bot, Globe, Network, BarChart3, Leaf,
  Layers3, Cpu, GraduationCap, Orbit, Briefcase,
} from "lucide-react";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

export default function SearchBar({
  variant = "full",
  defaultQuery = "",
  onCategorySelect,
}) {
  const isSubjectPage = variant === "subject";
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [classLocation, setClassLocation] = useState("around-me");

  const [subjectSuggestions, setSubjectSuggestions] = useState([]);
  const [showSubjectSuggestions, setShowSubjectSuggestions] = useState(false);

  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [showRecentDropdown, setShowRecentDropdown] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(false);

  const [locationSearchQuery, setLocationSearchQuery] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [categories, setCategories] = useState([]);

  const [isDragging, setIsDragging] = useState(false);

  const locationDropdownRef = useRef(null);
  const recentDropdownRef = useRef(null);
  const searchContainerRef = useRef(null);
  const locationSuggestionsRef = useRef(null);
  const locationInputRef = useRef(null);
  const categoriesContainerRef = useRef(null);
  const subjectSuggestionsRef = useRef(null);

  const placeholderSubjects = ["Mathematics", "Physics", "Coding", "English", "Biology", "Science", "Music"];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const DefaultIcon = Book;

  const subjectIconMap = {
    English: Languages,
    Mathematics: Calculator,
    "Physical Education": Dumbbell,
    Yoga: Flower2,
    Physics: Atom,
    Music: Guitar,
    "Public Speaking": Mic,
    banking: BookOpen,
    Biology: Microscope,
    Agriculture: Tractor,
    Accounting: BookUser,
    Art: Palette,
    Coding: SquareCode,
    ComputerScience: LaptopMinimal,
    Chemistry: Beaker,
    BussinessStudies: Handshake,
    DeepLearning: Brain,
    Dance: Speaker,
    Drama: Drama,
    Economics: Vote,
    EnviourmentalStudies: Vegan,
    Hindi: BookOpenText,
    Geography: TentTree,
    History: ScrollText,
    "Home Science": Orbit,
    "Machine learning": Brain,
    Philosophy: LibraryBig,
    "physical chemistry": FlaskConical,
    "Political Science": Landmark,
    Psychology: Brain,
    Python: Code2,
    Robotics: Bot,
    Science: Atom,
    "Social science": Globe,
    Sociology: Network,
    Statistics: BarChart3,
    "Environmental Science": Leaf,
    "Deep Learning": Layers3,
    "Computer Science": Cpu,
    "Business Studies": GraduationCap,
    Commerce: Briefcase,
  };

  const getIconForSubject = (subjectName) => {
    const normalizedSubject = subjectName.toLowerCase().trim();
    const category = categories.find(
      (cat) =>
        cat.label.toLowerCase() === normalizedSubject ||
        cat.id === normalizedSubject,
    );
    return category ? category.icon : DefaultIcon;
  };

  const checkScrollButtons = () => {
    const container = categoriesContainerRef.current;
    if (container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  };

  const locationOptions = [
    { id: "around-me", label: "Around me", icon: MapPin },
    { id: "online", label: "Online", icon: Monitor },
  ];

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSelectedCategory(null);
      setShowLocationSelector(false);
      setShowSubjectSuggestions(false);
    }
  }, [searchQuery]);

  // ✅ CHANGE 1 — Smooth placeholder cycling
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderSubjects.length);
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch("/api/get-subject-array");
        const data = await res.json();
        if (data.success) {
          const formatted = data.subjects.map((subject) => ({
            id: subject,
            label: subject,
            icon: subjectIconMap[subject] || DefaultIcon,
          }));
          setCategories(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch subjects", err);
      }
    };
    fetchSubjects();
  }, []);

  useEffect(() => {
    const getOrCreateSessionId = () => {
      let id = localStorage.getItem("search_session_id");
      if (!id) {
        id = "guest_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
        localStorage.setItem("search_session_id", id);
      }
      return id;
    };
    const id = getOrCreateSessionId();
    setSessionId(id);
    loadRecentSearches(id);
  }, []);

  useEffect(() => {
    const container = categoriesContainerRef.current;
    if (!container) return;
    checkScrollButtons();
    const timer = setTimeout(() => checkScrollButtons(), 300);
    container.addEventListener("scroll", checkScrollButtons);
    window.addEventListener("resize", checkScrollButtons);
    return () => {
      clearTimeout(timer);
      container.removeEventListener("scroll", checkScrollButtons);
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      setTimeout(() => checkScrollButtons(), 100);
    }
  }, [categories]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target) &&
        !event.target.closest("#location-button")
      ) {
        setShowLocationDropdown(false);
      }
      if (
        recentDropdownRef.current &&
        !recentDropdownRef.current.contains(event.target) &&
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setShowRecentDropdown(false);
      }
      if (
        locationSuggestionsRef.current &&
        !locationSuggestionsRef.current.contains(event.target) &&
        locationInputRef.current &&
        !locationInputRef.current.contains(event.target) &&
        !event.target.closest("#location-search-input")
      ) {
        setShowLocationSuggestions(false);
      }
      if (
        subjectSuggestionsRef.current &&
        !subjectSuggestionsRef.current.contains(event.target) &&
        !event.target.closest("#main-search-input")
      ) {
        setShowSubjectSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const loadRecentSearches = async (sid) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/recent-search?session_id=${sid}`);
      const data = await response.json();
      if (data.success) {
        setRecentSearches(data.searches);
      }
    } catch (error) {
      console.error("Failed to load recent searches:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveSearchToBackend = async (query, category, locationType, locationData = null) => {
    if (!query.trim() || !sessionId) return;
    try {
      await fetch("https://learnospherebackend.learnosphere.in/api/route/recent-search/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          search_query: query,
          category: category,
          location_type: locationType,
          session_id: sessionId,
          location_data: locationData,
        }),
      });
      loadRecentSearches(sessionId);
    } catch (error) {
      console.error("Failed to save search:", error);
    }
  };

  const deleteSearch = async (searchId) => {
    try {
      await fetch("https://learnospherebackend.learnosphere.in/api/route/recent-search/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          search_id: searchId,
          session_id: sessionId,
        }),
      });
      setRecentSearches(recentSearches.filter((s) => s.id !== searchId));
    } catch (error) {
      console.error("Failed to delete search:", error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim().length > 0 || selectedCategory !== null) {
      setShowLocationSelector(true);
    } else {
      setShowLocationSelector(false);
      setShowLocationDropdown(false);
      setShowLocationInput(false);
    }
  }, [searchQuery, selectedCategory]);

  const searchLocations = useCallback(
    debounce(async (query) => {
      if (!query || query.trim().length < 2) {
        setLocationSuggestions([]);
        setShowLocationSuggestions(false);
        return;
      }
      setLocationLoading(true);
      try {
        const response = await fetch(
          `https://learnospherebackend.learnosphere.in/api/route/search?q=${encodeURIComponent(query)}`,
        );
        if (!response.ok) throw new Error("Location search failed");
        const results = await response.json();
        setLocationSuggestions(results);
        setShowLocationSuggestions(results.length > 0);
      } catch (error) {
        console.error("Location search error:", error);
        setLocationSuggestions([]);
      } finally {
        setLocationLoading(false);
      }
    }, 300),
    [],
  );

  useEffect(() => {
    if (locationSearchQuery && locationSearchQuery.trim().length > 1) {
      searchLocations(locationSearchQuery);
    } else {
      setLocationSuggestions([]);
      setShowLocationSuggestions(false);
    }
  }, [locationSearchQuery, searchLocations]);

  useEffect(() => {
    if (variant === "subject" && defaultQuery) {
      const normalized = defaultQuery.toLowerCase().trim();
      const matchedCategory = categories.find(
        (cat) => cat.label.toLowerCase() === normalized || cat.id === normalized
      );
      setSearchQuery(defaultQuery);
      setSelectedCategory(matchedCategory?.id || null);
      setShowLocationSelector(true);
    }
  }, [variant, defaultQuery, categories]);

  const handleLocationSelect = async (locationId) => {
    setClassLocation(locationId);
    setShowLocationDropdown(false);
    if (locationId === "around-me") {
      setShowLocationInput(true);
      setSelectedLocation(null);
      setLocationSearchQuery("");
    } else {
      setShowLocationInput(false);
      setSelectedLocation(null);
      setUserCoordinates(null);
    }
  };

  const handleLocationSuggestionSelect = (location) => {
    setSelectedLocation(location);
    setLocationSearchQuery(location.display);
    setShowLocationSuggestions(false);
    setUserCoordinates(null);
  };

  const handleNavigation = (subjectLabel) => {
    if (onCategorySelect) {
      onCategorySelect(subjectLabel);
      return;
    }
    const safeSubject = encodeURIComponent(subjectLabel.toLowerCase());
    const currentPath = window.location.pathname;
    if (classLocation === "online") {
      router.push(`/home-tuition/online-tuition/lessons/${safeSubject}`);
      return;
    }
    if (classLocation === "around-me" && selectedLocation) {
      const city = selectedLocation.display.split(',')[0].toLowerCase().trim().replace(/\s+/g, '-');
      router.push(`/home-tuition/home-tuition-in-${city}/lessons/${safeSubject}`);
      return;
    }
    if (currentPath.includes('/lessons/')) {
      const pathParts = currentPath.split('/');
      pathParts.pop();
      pathParts.push(safeSubject);
      router.push(pathParts.join('/'));
    } else {
      router.push(`/home-tuition/lessons/${safeSubject}`);
    }
  };

  const handleSearchClick = () => {
    // Find matching category/subject by search query text
    const matched = categories.find(
      (cat) => cat.label.toLowerCase() === searchQuery.toLowerCase().trim()
    );
    const finalSubject = selectedCategory || matched?.label;
    if (!finalSubject) {
      alert("Please select a subject from the dropdown list.");
      return;
    }
    if (!classLocation) {
      setShowLocationDropdown(true);
      return;
    }

      handleNavigation(finalSubject);
      setSearchQuery("");
      setSelectedCategory(null);
      setShowRecentDropdown(false);
      setShowLocationSelector(false);
      setShowLocationInput(false);
      setLocationSearchQuery("");
      setSelectedLocation(null);
    
      setIsGettingLocation(false);
    
  };

  const handleRecentClick = (search) => {
    setSearchQuery(search.query);
    setShowLocationSelector(true);
    const normalizedSubject = search.query.toLowerCase().trim();
    const categoryMatch = categories.find(
      (cat) => cat.label.toLowerCase() === normalizedSubject || cat.id === normalizedSubject
    );
    if (categoryMatch) {
      setSelectedCategory(categoryMatch.id);
    } else {
      setSelectedCategory(null);
    }
    if (search.location) {
      setClassLocation(search.location);
      if (search.location === "around-me") {
        setShowLocationInput(true);
        if (search.location_data) {
          setSelectedLocation(search.location_data);
          setLocationSearchQuery(search.location_data.display);
        }
      } else {
        setShowLocationInput(false);
      }
    }
    setShowRecentDropdown(false);
  };

  const scrollCategories = (direction) => {
    if (categoriesContainerRef.current) {
      const scrollAmount = 300;
      if (direction === "right") {
        categoriesContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      } else if (direction === "left") {
        categoriesContainerRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      }
    }
  };

  const handleSubjectSuggestionClick = async (subjectObj) => {
    setSearchQuery(subjectObj.label);
    setSelectedCategory(subjectObj.id);
    setShowSubjectSuggestions(false);
    setShowLocationSelector(true);
    await saveSearchToBackend(subjectObj.label, subjectObj.id, classLocation, selectedLocation);
    handleNavigation(subjectObj.label);
  };

  return (
    <div className="w-full relative h-max px-2 md:px-0" ref={searchContainerRef}>

      <div className="bg-white rounded-full shadow-lg p-2 md:p-2 mb-4 flex items-center relative w-full transition-all duration-300">

        <Search className="w-4 h-4 md:w-5 md:h-5 text-orange-400 flex-shrink-0 ml-2" />

        <div className="flex-1 relative flex items-center min-w-0">

          {/* ✅ CHANGE 2 — Fixed sizing logic for overlapping animated placeholder spans */}
          {!searchQuery && variant !== "subject" && (
            <div className="absolute left-2 pointer-events-none h-[32px] flex items-center w-full">
              {/* Static "Try " — never moves */}
              <span className="text-sm md:text-lg text-gray-400 whitespace-nowrap flex-shrink-0">
                Try&nbsp;&nbsp;
              </span>

              <div className="relative h-[32px] flex items-center overflow-hidden min-w-[120px] md:min-w-[150px]">
                {/* Invisible sizer — ensures container is always wide enough */}
                <span className="text-sm md:text-lg whitespace-nowrap opacity-0 pointer-events-none" aria-hidden="true">
                  {placeholderSubjects[placeholderIndex].length > placeholderSubjects[(placeholderIndex + 1) % placeholderSubjects.length].length
                    ? placeholderSubjects[placeholderIndex]
                    : placeholderSubjects[(placeholderIndex + 1) % placeholderSubjects.length]}
                </span>
                
                {/* Outgoing subject */}
                <span
                  key={`out-${placeholderIndex}`}
                  className="absolute left-0 text-sm md:text-lg text-gray-400 whitespace-nowrap"
                  style={{ animation: "placeholderOut 0.5s ease-in forwards" }}
                >
                  {placeholderSubjects[placeholderIndex]}
                </span>
                
                {/* Incoming subject */}
                <span
                  key={`in-${placeholderIndex}`}
                  className="absolute left-0 text-sm md:text-lg text-gray-400 whitespace-nowrap"
                  style={{ animation: "placeholderIn 0.5s ease-out forwards", animationDelay: "0.1s", opacity: 0 }}
                >
                  {placeholderSubjects[(placeholderIndex + 1) % placeholderSubjects.length]}
                </span>
              </div>
            </div>
          )}

          <input
            id="main-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              const val = e.target.value;
              setSearchQuery(val);
              if (val.trim() === "") {
                setSelectedCategory(null);
                setShowLocationSelector(false);
                setShowLocationSelector(false);
                setSubjectSuggestions(categories);
                setShowSubjectSuggestions(true);
              } else {
                const filtered = categories
                  .filter((cat) => cat.label.toLowerCase().includes(val.toLowerCase()));
                setSubjectSuggestions(filtered);
                setShowSubjectSuggestions(true);
              }
            }}
              onFocus={() => {
              if (searchQuery.trim() === "") {
                setSubjectSuggestions(categories);
              } else {
                const filtered = categories
                  .filter((cat) => cat.label.toLowerCase().includes(searchQuery.toLowerCase()));
                setSubjectSuggestions(filtered);
              }
              setShowSubjectSuggestions(true);
              setShowLocationSelector(true);
            }} 
            placeholder={variant === "subject" ? `Search ${defaultQuery}` : ""}
            className="w-full text-sm md:text-lg text-gray-700 placeholder-gray-400 outline-none bg-transparent pl-2 pr-6 md:pr-10 py-2.5 md:py-2 truncate relative z-10"
            onKeyDown={(e) => {
              if (e.key === "Enter" && searchQuery.trim()) {
                e.preventDefault();
                handleSearchClick();
              }
            }}
          />

          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
                setShowLocationSelector(false);
                setShowRecentDropdown(false);
                setShowSubjectSuggestions(false);
              }}
              className="absolute right-0 md:right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 z-20"
            >
              <X className="w-3.5 h-3.5 md:w-5 md:h-5" />
            </button>
          )}
        </div>

        {/* LOCATION SELECTOR */}
        {showLocationSelector && (
          <div className="border-l border-gray-200 ml-1 pl-1 md:ml-2 md:pl-4 flex items-center flex-shrink-0 relative z-20">
            {showLocationInput ? (
              <div className="relative w-[90px] md:w-[150px] flex items-center">
                <Search className="w-3 h-3 text-orange-500 hidden md:block" />
                <input
                  id="location-search-input"
                  type="text"
                  autoFocus
                  value={locationSearchQuery}
                  onChange={(e) => setLocationSearchQuery(e.target.value)}
                  onFocus={() => {
                    setShowRecentDropdown(false);
                    setShowSubjectSuggestions(false);
                  }}
                  placeholder="City..."
                  className="w-full text-xs md:text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent pl-1 md:pl-2 truncate"
                />
                {locationSearchQuery && (
                  <button
                    onClick={() => {
                      setLocationSearchQuery("");
                      setSelectedLocation(null);
                      setLocationSuggestions([]);
                      setShowLocationSuggestions(false);
                    }}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
                {showLocationSuggestions && locationSuggestions.length > 0 && (
                  <div
                    ref={locationSuggestionsRef}
                    className="absolute top-[40px] right-0 w-[200px] md:w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 max-h-60 overflow-y-auto"
                  >
                    <div className="px-3 pb-1 border-b border-gray-100">
                      <p className="text-xs font-medium text-gray-700">Location Suggestions</p>
                    </div>
                    {locationLoading ? (
                      <div className="px-3 py-3 text-center text-gray-500">
                        <Loader2 className="w-3 h-3 animate-spin mx-auto" />
                      </div>
                    ) : (
                      locationSuggestions.map((location, index) => (
                        <button
                          key={index}
                          onClick={() => handleLocationSuggestionSelect(location)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-orange-50 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          <MapPin className="w-3 h-3 text-gray-500 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-800 text-xs truncate">{location.display}</p>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button
                  id="location-button"
                  onClick={() => setShowLocationDropdown(!showLocationDropdown)}
                  className="flex items-center gap-1 md:gap-2 px-1 md:px-2 py-2 text-gray-700 hover:text-orange-600 transition-colors group"
                >
                  {classLocation === "online" ? (
                    <Monitor className="w-3.5 h-3.5 md:w-4 text-orange-500 flex-shrink-0" />
                  ) : (
                    <MapPin className="w-3.5 h-3.5 md:w-4 text-gray-600 group-hover:text-orange-500 flex-shrink-0" />
                  )}
                  <span className="whitespace-nowrap text-xs md:text-base font-medium truncate max-w-[55px] md:max-w-none">
                    {classLocation === "online" ? "Online" : "Loc"}
                  </span>
                  <ChevronDown
                    className={`w-3 h-3 md:w-4 md:h-4 flex-shrink-0 transition-transform ${showLocationDropdown ? "rotate-180" : ""} text-gray-500 group-hover:text-orange-500`}
                  />
                </button>

                {showLocationDropdown && (
                  <div
                    ref={locationDropdownRef}
                    className="absolute top-[45px] right-0 bg-white rounded-xl shadow-lg border border-gray-200 py-2 min-w-[150px] md:min-w-[200px] z-50"
                  >
                    <div className="px-3 pb-2 border-b border-gray-100">
                      <p className="text-xs md:text-sm font-medium text-gray-700">Choose location</p>
                    </div>
                    {locationOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => handleLocationSelect(option.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-orange-50 transition-colors ${
                          classLocation === option.id ? "bg-orange-50" : ""
                        }`}
                      >
                        <option.icon
                          className={`w-3.5 h-3.5 ${classLocation === option.id ? "text-orange-500" : "text-gray-500"}`}
                        />
                        <span
                          className={`text-xs md:text-sm ${
                            classLocation === option.id ? "text-orange-600 font-medium" : "text-gray-700"
                          }`}
                        >
                          {option.label}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ORANGE SEARCH BUTTON */}
        <button
          onClick={handleSearchClick}
          disabled={isGettingLocation}
          className="bg-gradient-to-r from-orange-400 to-orange-500 text-white w-10 h-10 md:w-auto md:px-6 md:py-2.5 rounded-full flex items-center justify-center shadow-md flex-shrink-0 ml-1 md:ml-3 disabled:opacity-70 transition-transform hover:scale-105 z-20 relative"
        >
          {isGettingLocation ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              <Search className="w-4 h-4 md:hidden" />
              <span className="hidden md:flex items-center gap-2 font-semibold">
                <Search className="w-4 h-4" />
                Search
              </span>
            </>
          )}
        </button>
      </div>

      {/* SUBJECT SUGGESTIONS DROPDOWN */}
      {showSubjectSuggestions && subjectSuggestions.length > 0 && (
        <div
          ref={subjectSuggestionsRef}
          className="absolute top-[50px] md:top-[60px] left-0 w-[calc(100%-80px)] md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
        >
          <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Suggested Subjects</p>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {subjectSuggestions.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleSubjectSuggestionClick(cat)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-orange-50 transition-colors border-b border-gray-50 last:border-0"
              >
                <div className="p-1.5 bg-orange-100 rounded-full text-orange-500">
                  <cat.icon className="w-4 h-4" />
                </div>
                <span className="text-gray-800 text-sm font-bold">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}


      {/* CATEGORIES SECTION */}
      {!isSubjectPage && (
        <div className="w-full flex justify-center mt-2 md:mt-0">
          <div className="w-full md:w-[1000px] relative px-2 md:px-0">
            <div className="w-full">
              <div className="bg-white rounded-[2rem] md:rounded-full shadow-lg relative pt-2 pb-1.5 md:py-2.5 group">

                {canScrollLeft && (
                  <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg p-2.5 hidden md:flex items-center justify-center hover:bg-gray-50 transition-colors z-20 ml-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollCategories("left");
                    }}
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-400 hover:text-orange-500" />
                  </button>
                )}

                <div
                  ref={categoriesContainerRef}
                  className="mobile-scroll-bar flex items-center gap-3 md:gap-10 overflow-x-auto mx-1 md:mx-20 px-3 md:px-0 pb-1 md:pb-0"
                  onMouseDown={() => setIsDragging(false)}
                  onMouseMove={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onTouchStart={() => setIsDragging(false)}
                  onTouchMove={() => setIsDragging(true)}
                  onTouchEnd={() => setIsDragging(false)}
                >
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.id;
                    return (
                      <div key={category.id} className="flex-shrink-0">
                        <button
                          onClick={(e) => {
                            if (isDragging) {
                              e.preventDefault();
                              return;
                            }
                            if (isSelected) {
                              setSelectedCategory(null);
                              setSearchQuery("");
                              setShowLocationSelector(false);
                              if (onCategorySelect) onCategorySelect(null);
                            } else {
                              setSelectedCategory(category.id);
                              setSearchQuery(category.label);
                              setShowLocationSelector(true);
                              handleNavigation(category.label);
                            }
                          }}
                          className={`group/btn flex flex-col items-center justify-center transition cursor-pointer min-w-[65px] md:min-w-[90px] py-1 md:py-2 ${
                            isSelected ? "scale-105" : ""
                          }`}
                        >
                          <div className="p-2 md:p-2.5 rounded-full bg-gray-50 group-hover/btn:bg-orange-50 transition-colors border border-gray-100 shadow-sm flex items-center justify-center">
                            <Icon
                              className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${
                                isSelected
                                  ? "text-orange-500"
                                  : "text-gray-500 group-hover/btn:text-orange-400"
                              }`}
                            />
                          </div>
                          <span
                            className={`text-[8px] md:text-[10px] mt-1 uppercase tracking-wide whitespace-nowrap transition-colors font-semibold ${
                              isSelected
                                ? "text-orange-600"
                                : "text-gray-600 group-hover/btn:text-orange-400"
                            }`}
                          >
                            {category.label}
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>

                {canScrollRight && (
                  <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg p-2.5 hidden md:flex items-center justify-center hover:bg-gray-50 transition-colors z-20 mr-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      scrollCategories("right");
                    }}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400 hover:text-orange-500" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ✅ CHANGE 3 — Fixed vertical clip during animations */
        @keyframes placeholderIn {
          0%   { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0);    opacity: 1; }
        }

        @keyframes placeholderOut {
          0%   { transform: translateY(0);      opacity: 1; }
          100% { transform: translateY(-100%);  opacity: 0; }
        }

        /* Mobile Scrollbar Styling */
        .mobile-scroll-bar::-webkit-scrollbar {
          height: 4px;
        }
        .mobile-scroll-bar::-webkit-scrollbar-track {
          background: transparent;
          margin: 0 35vw;
        }
        .mobile-scroll-bar::-webkit-scrollbar-thumb {
          background: #f97316;
          border-radius: 10px;
        }

        /* Hide scrollbar on desktop */
        @media (min-width: 768px) {
          .mobile-scroll-bar::-webkit-scrollbar {
            display: none;
          }
          .mobile-scroll-bar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        }
      `}</style>
    </div>
  );
}