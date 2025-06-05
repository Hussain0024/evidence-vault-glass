
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract EvidenceRegistry {
    struct Evidence {
        string fileHash;
        address submitter;
        uint256 timestamp;
        string evidenceType;
        string caseNumber;
        bool exists;
    }
    
    mapping(string => Evidence) private evidenceRegistry;
    mapping(address => string[]) private userEvidence;
    
    event EvidenceRegistered(
        string indexed fileHash,
        address indexed submitter,
        uint256 timestamp,
        string evidenceType,
        string caseNumber
    );
    
    event EvidenceVerified(
        string indexed fileHash,
        address indexed verifier,
        uint256 timestamp
    );
    
    modifier evidenceExists(string memory _fileHash) {
        require(evidenceRegistry[_fileHash].exists, "Evidence does not exist");
        _;
    }
    
    modifier evidenceNotExists(string memory _fileHash) {
        require(!evidenceRegistry[_fileHash].exists, "Evidence already exists");
        _;
    }
    
    function registerEvidence(
        string memory _fileHash,
        string memory _evidenceType,
        string memory _caseNumber
    ) external evidenceNotExists(_fileHash) {
        Evidence memory newEvidence = Evidence({
            fileHash: _fileHash,
            submitter: msg.sender,
            timestamp: block.timestamp,
            evidenceType: _evidenceType,
            caseNumber: _caseNumber,
            exists: true
        });
        
        evidenceRegistry[_fileHash] = newEvidence;
        userEvidence[msg.sender].push(_fileHash);
        
        emit EvidenceRegistered(
            _fileHash,
            msg.sender,
            block.timestamp,
            _evidenceType,
            _caseNumber
        );
    }
    
    function verifyEvidence(string memory _fileHash) 
        external 
        view 
        evidenceExists(_fileHash)
        returns (
            string memory fileHash,
            address submitter,
            uint256 timestamp,
            string memory evidenceType,
            string memory caseNumber
        ) 
    {
        Evidence memory evidence = evidenceRegistry[_fileHash];
        return (
            evidence.fileHash,
            evidence.submitter,
            evidence.timestamp,
            evidence.evidenceType,
            evidence.caseNumber
        );
    }
    
    function getUserEvidence(address _user) 
        external 
        view 
        returns (string[] memory) 
    {
        return userEvidence[_user];
    }
    
    function isEvidenceRegistered(string memory _fileHash) 
        external 
        view 
        returns (bool) 
    {
        return evidenceRegistry[_fileHash].exists;
    }
}
