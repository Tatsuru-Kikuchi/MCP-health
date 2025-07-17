#!/usr/bin/env python3
"""
Unit tests for data analysis module
"""

import unittest
import pandas as pd
import numpy as np
from unittest.mock import patch, MagicMock
import sys
import os

# Add project root to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from scripts.data_analysis import HealthcareProductivityAnalyzer

class TestHealthcareProductivityAnalyzer(unittest.TestCase):
    """Test cases for HealthcareProductivityAnalyzer class."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.analyzer = HealthcareProductivityAnalyzer(data_dir="test_data/")
        
        # Create sample data
        self.sample_admin_data = pd.DataFrame({
            'hospital_id': [1, 2, 3],
            'admin_percentage': [0.016, 0.018, 0.015],
            'hours_per_patient': [2.0, 2.5, 1.8],
            'avg_processing_time': [4.0, 4.5, 3.5],
            'error_rate': [0.025, 0.020, 0.030]
        })
        
        self.sample_workforce_data = pd.DataFrame({
            'region_id': [1, 2, 3],
            'total_workers': [10000, 8000, 12000]
        })
        
        self.sample_patient_data = pd.DataFrame({
            'year': [2023, 2023, 2023],
            'total_patients': [1000000, 800000, 1200000]
        })
        
        self.sample_expenditure_data = pd.DataFrame({
            'year': [2023],
            'total_expenditure': [45e12]
        })
    
    def test_calculate_baseline_metrics(self):
        """Test baseline metrics calculation."""
        data = {
            'administrative_costs': self.sample_admin_data,
            'workforce': self.sample_workforce_data,
            'patient_volume': self.sample_patient_data,
            'medical_expenditure': self.sample_expenditure_data
        }
        
        baseline = self.analyzer.calculate_baseline_metrics(data)
        
        # Check if metrics are calculated
        self.assertIn('admin_hours_per_patient', baseline)
        self.assertIn('billing_error_rate', baseline)
        self.assertIn('patients_per_worker', baseline)
        
        # Check reasonable values
        self.assertGreater(baseline['admin_hours_per_patient'], 0)
        self.assertLess(baseline['billing_error_rate'], 1)
        self.assertGreater(baseline['patients_per_worker'], 0)
    
    def test_calculate_ai_impact_metrics(self):
        """Test AI impact metrics calculation."""
        baseline = {
            'admin_hours_per_patient': 2.0,
            'processing_time_hours': 4.0,
            'billing_error_rate': 0.025,
            'patients_per_worker': 20,
            'cost_per_patient': 250000
        }
        
        ai_metrics = self.analyzer.calculate_ai_impact_metrics(baseline)
        
        # Check if AI improvements are applied
        self.assertLess(ai_metrics['admin_hours_per_patient'], baseline['admin_hours_per_patient'])
        self.assertLess(ai_metrics['processing_time_hours'], baseline['processing_time_hours'])
        self.assertLess(ai_metrics['billing_error_rate'], baseline['billing_error_rate'])
        self.assertGreater(ai_metrics['patients_per_worker'], baseline['patients_per_worker'])
        self.assertLess(ai_metrics['cost_per_patient'], baseline['cost_per_patient'])
    
    def test_calculate_cost_savings(self):
        """Test cost savings calculation."""
        baseline = {
            'admin_hours_per_patient': 2.0,
            'billing_error_rate': 0.025,
            'patients_per_worker': 20
        }
        
        ai_metrics = {
            'admin_hours_per_patient': 1.0,
            'billing_error_rate': 0.006,
            'patients_per_worker': 24.4
        }
        
        savings = self.analyzer.calculate_cost_savings(baseline, ai_metrics)
        
        # Check if savings are calculated
        self.assertIn('admin_labor_savings', savings)
        self.assertIn('error_cost_savings', savings)
        self.assertIn('additional_revenue', savings)
        self.assertIn('total_annual_savings', savings)
        
        # Check if all savings are positive
        for key, value in savings.items():
            self.assertGreater(value, 0, f"{key} should be positive")
    
    @patch('pandas.read_csv')
    def test_load_data_success(self, mock_read_csv):
        """Test successful data loading."""
        # Mock successful CSV reading
        mock_read_csv.return_value = pd.DataFrame({'test': [1, 2, 3]})
        
        data = self.analyzer.load_data()
        
        # Check if all expected datasets are loaded
        expected_datasets = [
            'medical_expenditure',
            'workforce',
            'administrative_costs',
            'patient_volume',
            'ai_costs'
        ]
        
        for dataset in expected_datasets:
            self.assertIn(dataset, data)
            self.assertIsInstance(data[dataset], pd.DataFrame)

if __name__ == '__main__':
    # Create test data directory if it doesn't exist
    os.makedirs('test_data', exist_ok=True)
    
    # Run tests
    unittest.main()